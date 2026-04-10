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
} from "./_lib/security";

type CateringPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  date?: unknown;
  time?: unknown;
  numberOfGuests?: unknown;
  selectedItems?: unknown;
  instructions?: unknown;
  pickupLocation?: unknown;
  website?: unknown;
};

const isValidTime = (value: string) => /^([01]\d|2[0-3]):00$/.test(value);

export default {
  async fetch(request: Request) {
    const methodError = rejectIfInvalidMethod(request, "POST");
    if (methodError) {
      return methodError;
    }

    const protection = withCommonProtection(request, "catering", {
      limit: 3,
      windowMs: 15 * 60 * 1000,
    });
    if (protection.denied) {
      return protection.denied;
    }

    try {
      const body = await parseJsonBody<CateringPayload>(request, 12_000);
      const website = sanitizeText(body.website, 120);
      if (website) {
        return json({ ok: true }, 200, noStoreHeaders());
      }

      const name = sanitizeText(body.name, 80);
      const email = sanitizeText(body.email, 120).toLowerCase();
      const phone = sanitizeText(body.phone, 32);
      const date = sanitizeText(body.date, 16);
      const time = sanitizeText(body.time, 8);
      const numberOfGuests = Number.parseInt(String(body.numberOfGuests ?? ""), 10);
      const instructions = sanitizeText(body.instructions, 1_500);
      const pickupLocation = sanitizeText(body.pickupLocation, 8);
      const selectedItems = Array.isArray(body.selectedItems)
        ? body.selectedItems
            .filter((item): item is string => typeof item === "string")
            .map((item) => sanitizeText(item, 64))
            .filter(Boolean)
            .slice(0, 60)
        : [];

      if (!name || !email || !phone || !date || !time || !pickupLocation) {
        return json({ error: "Invalid payload" }, 400, noStoreHeaders());
      }

      if (!validateEmail(email)) {
        return json({ error: "Invalid email" }, 400, noStoreHeaders());
      }

      if (!validatePhone(phone)) {
        return json({ error: "Invalid phone" }, 400, noStoreHeaders());
      }

      if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(`${date}T12:00:00`))) {
        return json({ error: "Invalid date" }, 400, noStoreHeaders());
      }

      if (!isValidTime(time)) {
        return json({ error: "Invalid time" }, 400, noStoreHeaders());
      }

      if (!Number.isFinite(numberOfGuests) || numberOfGuests < 1 || numberOfGuests > 5000) {
        return json({ error: "Invalid guest count" }, 400, noStoreHeaders());
      }

      if (selectedItems.length === 0) {
        return json({ error: "At least one item is required" }, 400, noStoreHeaders());
      }

      logRequest("catering_submission", {
        ip: protection.ip,
        emailDomain: email.split("@")[1] || "unknown",
        guestCount: numberOfGuests,
        itemCount: selectedItems.length,
        pickupLocation,
        instructionsLength: instructions.length,
      });

      return json({ ok: true }, 200, noStoreHeaders());
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return json({ error: message === "Payload too large" ? message : "Bad request" }, message === "Payload too large" ? 413 : 400, noStoreHeaders());
    }
  },
};
