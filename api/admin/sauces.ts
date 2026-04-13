// api/admin/sauces.ts
import { json, noStoreHeaders } from "../_lib/security";
import { supabaseAdmin, verifyAdminToken } from "../_lib/supabase-admin";

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
        const { data, error } = await supabaseAdmin.from("sauces").select("*").eq("id", id).single();
        if (error) return json({ error: error.message }, 404, noStoreHeaders());
        return json({ ok: true, data }, 200, noStoreHeaders());
      }
      const { data, error } = await supabaseAdmin.from("sauces").select("*").order("level").order("id");
      if (error) return json({ error: error.message }, 500, noStoreHeaders());
      // Deduplicate by name (case-insensitive)
      const seen = new Set<string>();
      const deduped = (data ?? []).filter((s) => {
        const key = s.name.toLowerCase().trim();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
      return json({ ok: true, data: deduped, count: deduped.length }, 200, noStoreHeaders());
    }

    if (method === "POST") {
      let body: Record<string, unknown>;
      try { body = (await request.json()) as Record<string, unknown>; } catch { return json({ error: "Invalid JSON" }, 400, noStoreHeaders()); }
      const { data, error } = await supabaseAdmin.from("sauces").insert([body]).select().single();
      if (error) return json({ error: error.message }, 400, noStoreHeaders());
      return json({ ok: true, data }, 201, noStoreHeaders());
    }

    if (method === "PUT") {
      if (!id) return json({ error: "id required" }, 400, noStoreHeaders());
      let body: Record<string, unknown>;
      try { body = (await request.json()) as Record<string, unknown>; } catch { return json({ error: "Invalid JSON" }, 400, noStoreHeaders()); }
      delete body.id;
      const { data, error } = await supabaseAdmin.from("sauces").update(body).eq("id", id).select().single();
      if (error) return json({ error: error.message }, 400, noStoreHeaders());
      return json({ ok: true, data }, 200, noStoreHeaders());
    }

    if (method === "DELETE") {
      if (!id) return json({ error: "id required" }, 400, noStoreHeaders());
      const { error } = await supabaseAdmin.from("sauces").delete().eq("id", id);
      if (error) return json({ error: error.message }, 400, noStoreHeaders());
      return json({ ok: true }, 200, noStoreHeaders());
    }

    return json({ error: "Method not allowed" }, 405, { ...noStoreHeaders(), Allow: "GET, POST, PUT, DELETE" });
  },
};
