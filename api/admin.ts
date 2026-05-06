// api/admin.ts
// Consolidated admin router — replaces api/admin/blog.ts, categories.ts,
// menu.ts, sauces.ts, seasonings.ts, users.ts, seed.ts
// Route: /api/admin?resource=<name>
// This keeps all 6 admin endpoints as a SINGLE Vercel serverless function.

import { json, noStoreHeaders } from "./_lib/security.js";
import { supabaseAdmin, verifyAdminToken } from "./_lib/supabase-admin.js";

// ─── helpers ─────────────────────────────────────────────────────────────────

const requireAdmin = async (request: Request) => {
  const user = await verifyAdminToken(request);
  if (!user) return { user: null, denied: json({ error: "Unauthorized" }, 401, noStoreHeaders()) };
  return { user, denied: null };
};

const requireAdminRole = async (request: Request) => {
  const { user, denied } = await requireAdmin(request);
  if (denied || !user) return { user: null, denied: denied ?? json({ error: "Unauthorized" }, 401, noStoreHeaders()) };
  if (["POST", "PUT", "PATCH", "DELETE"].includes(request.method) && user.role !== "admin") {
    return { user: null, denied: json({ error: "Forbidden: admin role required" }, 403, noStoreHeaders()) };
  }
  return { user, denied: null };
};

// ─── resource handlers ────────────────────────────────────────────────────────

async function handleBlog(request: Request): Promise<Response> {
  const { denied } = await requireAdmin(request);
  if (denied) return denied;

  const { method } = request;
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (method === "GET") {
    if (id) {
      const { data, error } = await supabaseAdmin.from("blog_posts").select("*").eq("id", id).single();
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
    try { body = (await request.json()) as Record<string, unknown>; }
    catch { return json({ error: "Invalid JSON" }, 400, noStoreHeaders()); }
    const { data, error } = await supabaseAdmin.from("blog_posts").insert([body]).select();
    if (error) return json({ error: error.message }, 500, noStoreHeaders());
    return json({ ok: true, data }, 201, noStoreHeaders());
  }

  if (method === "PUT" || method === "PATCH") {
    if (!id) return json({ error: "id is required" }, 400, noStoreHeaders());
    let body: Record<string, unknown>;
    try { body = (await request.json()) as Record<string, unknown>; }
    catch { return json({ error: "Invalid JSON" }, 400, noStoreHeaders()); }
    const { data, error } = await supabaseAdmin.from("blog_posts").update(body).eq("id", id).select();
    if (error) return json({ error: error.message }, 500, noStoreHeaders());
    return json({ ok: true, data }, 200, noStoreHeaders());
  }

  if (method === "DELETE") {
    if (!id) return json({ error: "id is required" }, 400, noStoreHeaders());
    const { error } = await supabaseAdmin.from("blog_posts").delete().eq("id", id);
    if (error) return json({ error: error.message }, 500, noStoreHeaders());
    return json({ ok: true }, 200, noStoreHeaders());
  }

  return json({ error: "Method not allowed" }, 405, noStoreHeaders());
}

async function handleCategories(request: Request): Promise<Response> {
  const { denied } = await requireAdminRole(request);
  if (denied) return denied;

  const { method } = request;
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (method === "GET") {
    if (id) {
      const { data, error } = await supabaseAdmin.from("categories").select("*").eq("id", id).single();
      if (error) return json({ error: error.message }, 404, noStoreHeaders());
      return json({ ok: true, data }, 200, noStoreHeaders());
    }
    const { data, error } = await supabaseAdmin.from("categories").select("*").order("display_order").order("id");
    if (error) return json({ error: error.message }, 500, noStoreHeaders());
    return json({ ok: true, data: data ?? [], count: data?.length ?? 0 }, 200, noStoreHeaders());
  }

  if (method === "POST") {
    let body: Record<string, unknown>;
    try { body = (await request.json()) as Record<string, unknown>; }
    catch { return json({ error: "Invalid JSON" }, 400, noStoreHeaders()); }
    const { data, error } = await supabaseAdmin.from("categories").insert([body]).select();
    if (error) return json({ error: error.message }, 500, noStoreHeaders());
    return json({ ok: true, data }, 201, noStoreHeaders());
  }

  if (method === "PUT" || method === "PATCH") {
    if (!id) return json({ error: "id is required" }, 400, noStoreHeaders());
    let body: Record<string, unknown>;
    try { body = (await request.json()) as Record<string, unknown>; }
    catch { return json({ error: "Invalid JSON" }, 400, noStoreHeaders()); }
    const { data, error } = await supabaseAdmin.from("categories").update(body).eq("id", id).select();
    if (error) return json({ error: error.message }, 500, noStoreHeaders());
    return json({ ok: true, data }, 200, noStoreHeaders());
  }

  if (method === "DELETE") {
    if (!id) return json({ error: "id is required" }, 400, noStoreHeaders());
    const { error } = await supabaseAdmin.from("categories").delete().eq("id", id);
    if (error) return json({ error: error.message }, 500, noStoreHeaders());
    return json({ ok: true }, 200, noStoreHeaders());
  }

  return json({ error: "Method not allowed" }, 405, noStoreHeaders());
}

async function handleMenu(request: Request): Promise<Response> {
  const { denied } = await requireAdminRole(request);
  if (denied) return denied;

  const { method } = request;
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (method === "GET") {
    if (id) {
      const { data, error } = await supabaseAdmin.from("menu_items").select("*").eq("id", id).single();
      if (error) return json({ error: error.message }, 404, noStoreHeaders());
      return json({ ok: true, data }, 200, noStoreHeaders());
    }
    const { data, error } = await supabaseAdmin.from("menu_items").select("*").order("category").order("id");
    if (error) return json({ error: error.message }, 500, noStoreHeaders());
    return json({ ok: true, data: data ?? [], count: data?.length ?? 0 }, 200, noStoreHeaders());
  }

  if (method === "POST") {
    let body: Record<string, unknown>;
    try { body = (await request.json()) as Record<string, unknown>; }
    catch { return json({ error: "Invalid JSON" }, 400, noStoreHeaders()); }
    const { data, error } = await supabaseAdmin.from("menu_items").insert([body]).select();
    if (error) return json({ error: error.message }, 500, noStoreHeaders());
    return json({ ok: true, data }, 201, noStoreHeaders());
  }

  if (method === "PUT" || method === "PATCH") {
    if (!id) return json({ error: "id is required" }, 400, noStoreHeaders());
    let body: Record<string, unknown>;
    try { body = (await request.json()) as Record<string, unknown>; }
    catch { return json({ error: "Invalid JSON" }, 400, noStoreHeaders()); }
    const { data, error } = await supabaseAdmin.from("menu_items").update(body).eq("id", id).select();
    if (error) return json({ error: error.message }, 500, noStoreHeaders());
    return json({ ok: true, data }, 200, noStoreHeaders());
  }

  if (method === "DELETE") {
    if (!id) return json({ error: "id is required" }, 400, noStoreHeaders());
    const { error } = await supabaseAdmin.from("menu_items").delete().eq("id", id);
    if (error) return json({ error: error.message }, 500, noStoreHeaders());
    return json({ ok: true }, 200, noStoreHeaders());
  }

  return json({ error: "Method not allowed" }, 405, noStoreHeaders());
}

async function handleSauces(request: Request): Promise<Response> {
  const { user, denied } = await requireAdmin(request);
  if (denied || !user) return denied!;

  if (["POST", "PUT", "DELETE"].includes(request.method) && user.role !== "admin") {
    return json({ error: "Forbidden: admin role required" }, 403, noStoreHeaders());
  }

  const { method } = request;
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
    try { body = (await request.json()) as Record<string, unknown>; }
    catch { return json({ error: "Invalid JSON" }, 400, noStoreHeaders()); }
    const { data, error } = await supabaseAdmin.from("sauces").insert([body]).select();
    if (error) return json({ error: error.message }, 500, noStoreHeaders());
    return json({ ok: true, data }, 201, noStoreHeaders());
  }

  if (method === "PUT" || method === "PATCH") {
    if (!id) return json({ error: "id is required" }, 400, noStoreHeaders());
    let body: Record<string, unknown>;
    try { body = (await request.json()) as Record<string, unknown>; }
    catch { return json({ error: "Invalid JSON" }, 400, noStoreHeaders()); }
    const { data, error } = await supabaseAdmin.from("sauces").update(body).eq("id", id).select();
    if (error) return json({ error: error.message }, 500, noStoreHeaders());
    return json({ ok: true, data }, 200, noStoreHeaders());
  }

  if (method === "DELETE") {
    if (!id) return json({ error: "id is required" }, 400, noStoreHeaders());
    const { error } = await supabaseAdmin.from("sauces").delete().eq("id", id);
    if (error) return json({ error: error.message }, 500, noStoreHeaders());
    return json({ ok: true }, 200, noStoreHeaders());
  }

  return json({ error: "Method not allowed" }, 405, noStoreHeaders());
}

async function handleSeasonings(request: Request): Promise<Response> {
  const { user, denied } = await requireAdmin(request);
  if (denied || !user) return denied!;

  if (["POST", "PUT", "DELETE"].includes(request.method) && user.role !== "admin") {
    return json({ error: "Forbidden: admin role required" }, 403, noStoreHeaders());
  }

  const { method } = request;
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
    try { body = (await request.json()) as Record<string, unknown>; }
    catch { return json({ error: "Invalid JSON" }, 400, noStoreHeaders()); }
    const { data, error } = await supabaseAdmin.from("seasonings").insert([body]).select();
    if (error) return json({ error: error.message }, 500, noStoreHeaders());
    return json({ ok: true, data }, 201, noStoreHeaders());
  }

  if (method === "PUT" || method === "PATCH") {
    if (!id) return json({ error: "id is required" }, 400, noStoreHeaders());
    let body: Record<string, unknown>;
    try { body = (await request.json()) as Record<string, unknown>; }
    catch { return json({ error: "Invalid JSON" }, 400, noStoreHeaders()); }
    const { data, error } = await supabaseAdmin.from("seasonings").update(body).eq("id", id).select();
    if (error) return json({ error: error.message }, 500, noStoreHeaders());
    return json({ ok: true, data }, 200, noStoreHeaders());
  }

  if (method === "DELETE") {
    if (!id) return json({ error: "id is required" }, 400, noStoreHeaders());
    const { error } = await supabaseAdmin.from("seasonings").delete().eq("id", id);
    if (error) return json({ error: error.message }, 500, noStoreHeaders());
    return json({ ok: true }, 200, noStoreHeaders());
  }

  return json({ error: "Method not allowed" }, 405, noStoreHeaders());
}

async function handleUsers(request: Request): Promise<Response> {
  const { user, denied } = await requireAdmin(request);
  if (denied || !user) return denied!;
  if (user.role !== "admin") return json({ error: "Forbidden: admin role required" }, 403, noStoreHeaders());

  const { method } = request;
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (method === "GET") {
    const { data: profiles, error } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) return json({ error: error.message }, 500, noStoreHeaders());
    return json({ ok: true, data: profiles ?? [], count: profiles?.length ?? 0 }, 200, noStoreHeaders());
  }

  if (method === "PUT" || method === "PATCH") {
    if (!id) return json({ error: "id is required" }, 400, noStoreHeaders());
    let body: Record<string, unknown>;
    try { body = (await request.json()) as Record<string, unknown>; }
    catch { return json({ error: "Invalid JSON" }, 400, noStoreHeaders()); }
    const { data, error } = await supabaseAdmin.from("profiles").update(body).eq("id", id).select();
    if (error) return json({ error: error.message }, 500, noStoreHeaders());
    return json({ ok: true, data }, 200, noStoreHeaders());
  }

  if (method === "DELETE") {
    if (!id) return json({ error: "id is required" }, 400, noStoreHeaders());
    const { error } = await supabaseAdmin.auth.admin.deleteUser(id);
    if (error) return json({ error: error.message }, 500, noStoreHeaders());
    return json({ ok: true }, 200, noStoreHeaders());
  }

  return json({ error: "Method not allowed" }, 405, noStoreHeaders());
}

// ─── seed handler (kept here, removed from separate file) ────────────────────

async function handleSeed(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, 405, { ...noStoreHeaders(), Allow: "POST" });
  }
  // Allow internal seeding via x-seed-key header
  const internalSeedKey = request.headers.get("x-seed-key") ?? "";
  const expectedSeedKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  const trustedInternalRequest =
    internalSeedKey.length > 0 &&
    expectedSeedKey.length > 0 &&
    internalSeedKey === expectedSeedKey;

  if (!trustedInternalRequest) {
    const { user, denied } = await requireAdmin(request);
    if (denied || !user) return denied!;
    if (user.role !== "admin") return json({ error: "Forbidden: admin role required" }, 403, noStoreHeaders());
  }

  // TODO: Insert actual seeding logic here
  return json({ ok: true, message: "Seed endpoint hit (implement logic)" }, 200, noStoreHeaders());
}

// ─── main router ─────────────────────────────────────────────────────────────

const RESOURCE_HANDLERS: Record<string, (req: Request) => Promise<Response>> = {
  blog: handleBlog,
  categories: handleCategories,
  menu: handleMenu,
  sauces: handleSauces,
  seasonings: handleSeasonings,
  users: handleUsers,
  seed: handleSeed,
};

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const resource = url.searchParams.get("resource");

    if (!resource) {
      return json(
        { error: "Missing required query param: resource", available: Object.keys(RESOURCE_HANDLERS) },
        400,
        noStoreHeaders()
      );
    }

    const handler = RESOURCE_HANDLERS[resource];
    if (!handler) {
      return json(
        { error: `Unknown resource: ${resource}`, available: Object.keys(RESOURCE_HANDLERS) },
        404,
        noStoreHeaders()
      );
    }

    return handler(request);
  },
};
