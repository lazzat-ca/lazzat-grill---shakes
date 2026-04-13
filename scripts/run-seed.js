/*
  Seed runner for local development.
  Calls the admin seed endpoint that inserts menu, sauces, seasonings, blog, and locations.

  Optional env:
  - SEED_URL: defaults to http://localhost:8080/api/admin/seed
  - SUPABASE_SERVICE_ROLE_KEY: if set, used as internal seed key

  Fallback:
  - Reads SUPABASE_SERVICE_ROLE_KEY from .env.local when available
*/

import fs from "node:fs";
import path from "node:path";

const readEnvFileValue = (key) => {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return null;

  const content = fs.readFileSync(envPath, "utf8");
  const line = content
    .split(/\r?\n/)
    .find((entry) => entry.trim().startsWith(`${key}=`));

  if (!line) return null;
  return line.slice(line.indexOf("=") + 1).trim();
};

const seedUrl = process.env.SEED_URL || "http://localhost:8080/api/admin/seed";
const seedKey = process.env.SUPABASE_SERVICE_ROLE_KEY || readEnvFileValue("SUPABASE_SERVICE_ROLE_KEY");

if (!seedKey) {
  console.error("Missing SUPABASE_SERVICE_ROLE_KEY.");
  console.error("Add it to .env.local or set it in terminal, then run npm run seed.");
  process.exit(1);
}

try {
  const response = await fetch(seedUrl, {
    method: "POST",
    headers: {
      "x-seed-key": seedKey,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ trigger: "manual-seed" }),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    console.error("Seed failed:", payload?.error || `HTTP ${response.status}`);
    process.exit(1);
  }

  console.log("Seed completed successfully.");
  if (payload?.counts) {
    console.log("Inserted counts:", payload.counts);
  }
} catch (error) {
  console.error("Seed request failed.");
  console.error(
    "Make sure your app is running with npm run dev and the endpoint is reachable at",
    seedUrl
  );
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
