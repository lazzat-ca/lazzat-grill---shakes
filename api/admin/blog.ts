// api/admin/blog.ts
// Blog CRUD. seo_editor and admin can read/write blog posts.
import { json, noStoreHeaders } from "../_lib/security.js";
import { supabaseAdmin, verifyAdminToken } from "../_lib/supabase-admin.js";

export default {
  async fetch(request: Request) {
    const { method } = request;
    const user = await verifyAdminToken(request);
    if (!user) return json({ error: "Unauthorized" }, 401, noStoreHeaders());
    // Both admin and seo_editor can manage blog posts

    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (method === "GET") {
      if (id) {
        const { data, error } = await supabaseAdmin
          .from("blog_posts")
          .select("*")
          .eq("id", id)
          .single();
        if (error) return json({ error: error.message }, 404, noStoreHeaders());
        return json({ ok: true, data }, 200, noStoreHeaders());
      }
      const { data, error } = await supabaseAdmin
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) return json({ error: error.message }, 500, noStoreHeaders());
      return json({ ok: true, data: data ?? [], count: data?.length ?? 0 }, 200, noStoreHeaders());
    }

    if (method === "POST") {
      let body: Record<string, unknown>;
      try { body = (await request.json()) as Record<string, unknown>; } catch { return json({ error: "Invalid JSON" }, 400, noStoreHeaders()); }
      const { data, error } = await supabaseAdmin
        .from("blog_posts")
        .insert([body])
        .select()
        .single();
      if (error) return json({ error: error.message }, 400, noStoreHeaders());
      return json({ ok: true, data }, 201, noStoreHeaders());
    }

    if (method === "PUT") {
      if (!id) return json({ error: "id required" }, 400, noStoreHeaders());
      let body: Record<string, unknown>;
      try { body = (await request.json()) as Record<string, unknown>; } catch { return json({ error: "Invalid JSON" }, 400, noStoreHeaders()); }
      delete body.id;
      const { data, error } = await supabaseAdmin
        .from("blog_posts")
        .update(body)
        .eq("id", id)
        .select()
        .single();
      if (error) return json({ error: error.message }, 400, noStoreHeaders());
      return json({ ok: true, data }, 200, noStoreHeaders());
    }

    if (method === "DELETE") {
      if (!id) return json({ error: "id required" }, 400, noStoreHeaders());
      const { error } = await supabaseAdmin.from("blog_posts").delete().eq("id", id);
      if (error) return json({ error: error.message }, 400, noStoreHeaders());
      return json({ ok: true }, 200, noStoreHeaders());
    }

    return json({ error: "Method not allowed" }, 405, { ...noStoreHeaders(), Allow: "GET, POST, PUT, DELETE" });
  },
};
