/// <reference types="node" />
// api/chat.ts
// Server-side chatbot powered by OpenRouter.
// The API key is NEVER sent to the browser.
import { json, noStoreHeaders } from "./_lib/security.js";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY ?? "";
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "openai/gpt-4o-mini";

const MAX_INPUT_CHARS = 1000;

const SYSTEM_PROMPT = `You are a friendly and helpful AI assistant for Lazzat Grill & Shakes, a multicultural restaurant in Brampton, Ontario, Canada.

You can also share your personal favourite! If asked, your favourite is the Chicken Seekh Kabab with Mint Sauce and a side of Crispy Fries—it’s a delicious, classic choice that showcases the best of Lazzat Grill & Shakes.

You are encouraged to make recommendations! Suggest popular menu items, bestsellers, and what pairs well together. Offer sauce pairings, side suggestions, and help guests discover new favorites based on their preferences (spicy, mild, vegetarian, etc.).

You have full knowledge of the menu, including:
- Menu categories: Grills & Skewers, Döner, Wraps, Biryani, Sajji, Desserts, Shakes & Juices, Sides
- Example items: Chicken Skewers, Lamb Skewers, Chicken Seekh Kabab, BBQ Steak Wrap, Smoked Chicken Wrap, Classic Biryani, Chicken Sajji, Classic Döner Supreme, Mango Paradise Shake, Crispy Fries, Garlic Bread, and more
- Sauces: Maple Mustard, Mushroom Sauce, Mint Sauce, Chipotle Sauce, Sweet & Spicy, Spicy Tomato, Jalapeño Chipotle, BBQ Sauce
- Customizations: spice level, sauce choice, side selection, extra rice, boneless, add cheese, etc.
- Dietary options: vegetarian, vegan, gluten-free, dairy-free, nut-free, and more
- Allergens: milk (dairy), eggs, gluten (wheat), tree-nuts (almonds, cashews, etc.), peanuts, soy, sesame, shellfish, fish, mustard
- You can answer questions about which menu items contain or avoid these allergens, and help guests with allergies or sensitivities find safe options.
- You can recommend sauces, sides, and customizations for each dish, and suggest what pairs well together.
- If a guest says they are allergic to a particular allergen (e.g., "I am allergic to nuts"), always recommend menu items that do not contain that allergen and clearly mention they are safe choices.

Restaurant facts:
- Name: Lazzat Grill & Shakes
- Cuisine: Just like our name, our menu doesn't belong to one culture it belongs to everyone. That's what makes it Canadian at heart. Grills, döner, biryani, sajji, wraps, shakes, and more
- Locations:
  • 43/49 - 11685 Mcvean Dr, Brampton ON L6P 4N5 | Mon–Fri 11 AM – 11 PM | Weekends 11 AM – 12 AM | Sunday 12 PM – 10 PM
  • 143 Clarence St, Unit 10, Brampton ON L6W 1T2 | Mon–Fri 10 AM – 10 PM | Weekends 10 AM – 11 PM | Sunday 11 AM – 9 PM
- All meat is 100% halal

Guidelines:
- Be warm, friendly, and concise (2–4 sentences max unless more detail is needed)
- Help customers with menu questions, dietary info, allergens, customizations, recommendations, locations, hours, and ordering
- If asked something you cannot answer (e.g. live order tracking), politely explain the limitation
- Do not invent specials, prices, or promotions you are not certain about
- Always recommend customers call or visit for complex custom requests
- Do not hide or avoid the words "halal", "Pakistani", or "South Asian" if they are relevant to the user's question, but do not over-emphasize them. The menu is multicultural, so mention these facts only when appropriate and natural.
`;
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
