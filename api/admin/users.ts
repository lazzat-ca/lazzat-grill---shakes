// api/admin/users.ts
// User management – ADMIN ONLY.
import { json, noStoreHeaders } from "../_lib/security.js";
import { supabaseAdmin, verifyAdminToken } from "../_lib/supabase-admin.js";

export default {
  async fetch(request: Request) {
    const { method } = request;
    const user = await verifyAdminToken(request);
    if (!user) return json({ error: "Unauthorized" }, 401, noStoreHeaders());
    if (user.role !== "admin") {
      return json({ error: "Forbidden: admin role required" }, 403, noStoreHeaders());
    }

    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    // GET – list users (profiles joined with auth metadata)
    if (method === "GET") {
      const { data: profiles, error } = await supabaseAdmin
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) return json({ error: error.message }, 500, noStoreHeaders());
      return json({ ok: true, data: profiles ?? [], count: profiles?.length ?? 0 }, 200, noStoreHeaders());
    }
    // ...POST, PUT, DELETE as needed
  }
};
