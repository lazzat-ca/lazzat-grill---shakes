// api/chat.ts
// Server-side chatbot powered by OpenRouter.
// The API key is NEVER sent to the browser.
import { json, noStoreHeaders } from "./_lib/security";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY ?? "";
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "openai/gpt-4o-mini";

const MAX_INPUT_CHARS = 1000;

const SYSTEM_PROMPT = `You are a friendly and helpful AI assistant for Lazzat Grill & Shakes, a halal Pakistani/South-Asian restaurant in Brampton, Ontario, Canada.

Restaurant facts:
- Name: Lazzat Grill & Shakes
- Cuisine: Halal, Pakistani, South Asian, grills, döner, biryani, sajji, wraps, shakes
- Locations:
  • 43/49 - 11685 Mcvean Dr, Brampton ON L6P 4N5 | Mon–Fri 11 AM – 11 PM | Weekends 11 AM – 12 AM | Sunday 12 PM – 10 PM
  • 143 Clarence St, Unit 10, Brampton ON L6W 1T2 | Mon–Fri 10 AM – 10 PM | Weekends 10 AM – 11 PM | Sunday 11 AM – 9 PM
- Menu categories: Grills & Skewers, Döner, Wraps, Biryani, Sajji, Desserts, Shakes & Juices, Sides
- Sauces: Maple Mustard, Mushroom Sauce, Mint Sauce, Chipotle Sauce, Sweet & Spicy, Spicy Tomato, Jalapeño Chipotle, BBQ Sauce
- All meat is 100% halal
- Dietary options available: vegetarian items, gluten-free options on request
- Customization: spice level, sauce choice, side selection

Guidelines:
- Be warm, friendly, and concise (2–4 sentences max unless more detail is needed)
- Help customers with menu questions, dietary info, locations, hours, and ordering
- If asked something you cannot answer (e.g. live order tracking), politely explain the limitation
- Do not invent specials, prices, or promotions you are not certain about
- Always recommend customers call or visit for complex custom requests`;

export default {
  async fetch(request: Request) {
    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405, {
        ...noStoreHeaders(),
        Allow: "POST",
      });
    }

    if (!OPENROUTER_API_KEY) {
      return json({ error: "Chat service unavailable" }, 503, noStoreHeaders());
    }

    let body: { message?: unknown };
    try {
      const contentType = request.headers.get("content-type") ?? "";
      if (!contentType.includes("application/json")) {
        return json({ error: "Expected JSON body" }, 400, noStoreHeaders());
      }
      body = (await request.json()) as { message?: unknown };
    } catch {
      return json({ error: "Invalid JSON" }, 400, noStoreHeaders());
    }

    const rawMessage = body.message;
    if (typeof rawMessage !== "string" || !rawMessage.trim()) {
      return json({ error: "message is required" }, 400, noStoreHeaders());
    }

    const userMessage = rawMessage.trim().slice(0, MAX_INPUT_CHARS);

    try {
      const orResponse = await fetch(OPENROUTER_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://lazzat.ca",
          "X-Title": "Lazzat Grill & Shakes",
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userMessage },
          ],
          max_tokens: 400,
          temperature: 0.7,
        }),
      });

      if (!orResponse.ok) {
        const errText = await orResponse.text();
        console.error("[chat] OpenRouter error:", orResponse.status, errText);
        return json(
          { error: "AI service temporarily unavailable, please try again." },
          502,
          noStoreHeaders()
        );
      }

      const data = (await orResponse.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      const reply = data?.choices?.[0]?.message?.content?.trim() ?? "";
      if (!reply) {
        return json({ error: "Empty response from AI" }, 502, noStoreHeaders());
      }

      return json({ reply }, 200, noStoreHeaders());
    } catch (err) {
      console.error("[chat] fetch error:", err);
      return json({ error: "Chat service error" }, 500, noStoreHeaders());
    }
  },
};
