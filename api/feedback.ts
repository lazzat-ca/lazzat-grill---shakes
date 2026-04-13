import {
  json,
  logRequest,
  noStoreHeaders,
  parseJsonBody,
  rejectIfInvalidMethod,
  sanitizeText,
  withCommonProtection,
} from "./_lib/security.js";

type FeedbackPayload = {
  name?: unknown;
  message?: unknown;
  rating?: unknown;
  website?: unknown;
};

export default {
  async fetch(request: Request) {
    const methodError = rejectIfInvalidMethod(request, "POST");
    if (methodError) {
      return methodError;
    }

    const protection = withCommonProtection(request, "feedback", {
      limit: 8,
      windowMs: 10 * 60 * 1000,
    });
    if (protection.denied) {
      return protection.denied;
    }

    try {
      const body = await parseJsonBody<FeedbackPayload>(request, 8_000);
      const website = sanitizeText(body.website, 120);
      if (website) {
        return json({ ok: true }, 200, noStoreHeaders());
      }

      const name = sanitizeText(body.name, 80);
      const message = sanitizeText(body.message, 1_500);
      const rating = Number.parseInt(String(body.rating ?? ""), 10);

      if (!name || !message) {
        return json({ error: "Invalid payload" }, 400, noStoreHeaders());
      }

      if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
        return json({ error: "Invalid rating" }, 400, noStoreHeaders());
      }

      logRequest("feedback_submission", {
        ip: protection.ip,
        rating,
        messageLength: message.length,
      });

      return json({ ok: true }, 200, noStoreHeaders());
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return json(
        { error: message === "Payload too large" ? message : "Bad request" },
        message === "Payload too large" ? 413 : 400,
        noStoreHeaders()
      );
    }
  },
};
