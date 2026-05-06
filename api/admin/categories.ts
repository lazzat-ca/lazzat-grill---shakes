// api/admin/categories.ts
// CRUD for categories. Requires admin or seo_editor role (read), admin only for write.
import { json, noStoreHeaders } from "../_lib/security.js";
import { supabaseAdmin, verifyAdminToken } from "../_lib/supabase-admin.js";

export default {
  async fetch(request: Request) {
    const { method } = request;

    // All admin routes require a valid token
    const user = await verifyAdminToken(request);
    if (!user) {
      return json({ error: "Unauthorized" }, 401, noStoreHeaders());
    }

    // Write operations require admin role
    if (["POST", "PUT", "PATCH", "DELETE"].includes(method) && user.role !== "admin") {
      return json({ error: "Forbidden: admin role required" }, 403, noStoreHeaders());
    }

    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    // GET – list or single
    if (method === "GET") {
      if (id) {
        const { data, error } = await supabaseAdmin
          .from("categories")
          .select("*")
          .eq("id", id)
          .single();
        if (error) return json({ error: error.message }, 404, noStoreHeaders());
        return json({ ok: true, data }, 200, noStoreHeaders());
      }
      const { data, error } = await supabaseAdmin
        .from("categories")
        .select("*")
        .order("display_order")
        .order("id");
      if (error) return json({ error: error.message }, 500, noStoreHeaders());
      return json({ ok: true, data: data ?? [], count: data?.length ?? 0 }, 200, noStoreHeaders());
    }
    // ...POST, PUT, PATCH, DELETE as needed
  }
};
