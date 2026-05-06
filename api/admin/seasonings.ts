// api/admin/seasonings.ts
import { json, noStoreHeaders } from "../_lib/security.js";
import { supabaseAdmin, verifyAdminToken } from "../_lib/supabase-admin.js";

export default {
  async fetch(request: Request) {
    const { method } = request;
    const user = await verifyAdminToken(request);
    if (!user) return json({ error: "Unauthorized" }, 401, noStoreHeaders());

    if (["POST", "PUT", "DELETE"].includes(method) && user.role !== "admin") {
      return json({ error: "Forbidden: admin role required" }, 403, noStoreHeaders());
    }

    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (method === "GET") {
      if (id) {
        const { data, error } = await supabaseAdmin.from("seasonings").select("*").eq("id", id).single();
        if (error) return json({ error: error.message }, 404, noStoreHeaders());
        return json({ ok: true, data }, 200, noStoreHeaders());
      }
      const { data, error } = await supabaseAdmin.from("seasonings").select("*").order("level").order("id");
      if (error) return json({ error: error.message }, 500, noStoreHeaders());
      // Deduplicate by name
      const seen = new Set<string>();
      const deduped = (data ?? []).filter((s) => {
        const key = s.name.toLowerCase().trim();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
      return json({ ok: true, data: deduped, count: deduped.length }, 200, noStoreHeaders());
    }
    // ...POST, PUT, DELETE as needed
  }
};
