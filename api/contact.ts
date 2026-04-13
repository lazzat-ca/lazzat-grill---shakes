import {
  json,
  logRequest,
  noStoreHeaders,
  parseJsonBody,
  rejectIfInvalidMethod,
  sanitizeText,
  validateEmail,
  validatePhone,
  withCommonProtection,
} from "./_lib/security.js";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown;
};

export default {
  async fetch(request: Request) {
    const methodError = rejectIfInvalidMethod(request, "POST");
    if (methodError) {
      return methodError;
    }

    const protection = withCommonProtection(request, "contact", {
      limit: 5,
      windowMs: 10 * 60 * 1000,
    });
    if (protection.denied) {
      return protection.denied;
    }

    try {
      const body = await parseJsonBody<ContactPayload>(request, 8_000);
      const website = sanitizeText(body.website, 120);
      if (website) {
        return json({ ok: true }, 200, noStoreHeaders());
      }

      const name = sanitizeText(body.name, 80);
      const email = sanitizeText(body.email, 120).toLowerCase();
      const phone = sanitizeText(body.phone, 32);
      const subject = sanitizeText(body.subject, 40);
      const message = sanitizeText(body.message, 1_500);

      if (!name || !email || !message) {
        return json({ error: "Invalid payload" }, 400, noStoreHeaders());
      }

      if (!validateEmail(email)) {
        return json({ error: "Invalid email" }, 400, noStoreHeaders());
      }

      if (phone && !validatePhone(phone)) {
        return json({ error: "Invalid phone" }, 400, noStoreHeaders());
      }

      logRequest("contact_submission", {
        ip: protection.ip,
        subject: subject || "feedback",
        emailDomain: email.split("@")[1] || "unknown",
        messageLength: message.length,
      });

      return json({ ok: true }, 200, noStoreHeaders());
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return json({ error: message === "Payload too large" ? message : "Bad request" }, message === "Payload too large" ? 413 : 400, noStoreHeaders());
    }
  },
};
