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

    // POST – create new user (email + password + role)
    if (method === "POST") {
      let body: { email?: unknown; password?: unknown; role?: unknown };
      try {
        body = (await request.json()) as { email?: unknown; password?: unknown; role?: unknown };
      } catch {
        return json({ error: "Invalid JSON" }, 400, noStoreHeaders());
      }

      const email = typeof body.email === "string" ? body.email.trim() : "";
      const password = typeof body.password === "string" ? body.password : "";
      // Default to 'pending' role for new registrations
      const role = body.role === "admin" || body.role === "seo_editor" ? body.role : "pending";

      if (!email || !password) {
        return json({ error: "email and password are required" }, 400, noStoreHeaders());
      }
      if (password.length < 8) {
        return json({ error: "Password must be at least 8 characters" }, 400, noStoreHeaders());
      }

      // Create auth user
      const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });
      if (createError) return json({ error: createError.message }, 400, noStoreHeaders());

      // Set role in profiles (trigger creates the row, we update it)
      const { error: profileError } = await supabaseAdmin
        .from("profiles")
        .upsert({ id: newUser.user.id, email, role })
        .eq("id", newUser.user.id);

      if (profileError) {
        // Try insert as fallback
        await supabaseAdmin
          .from("profiles")
          .insert({ id: newUser.user.id, email, role });
      }

      return json({ ok: true, data: { id: newUser.user.id, email, role } }, 201, noStoreHeaders());
    }


    // PUT – update role
    if (method === "PUT") {
      if (!id) return json({ error: "id required" }, 400, noStoreHeaders());
      let body: { role?: unknown };
      try { body = (await request.json()) as { role?: unknown }; } catch { return json({ error: "Invalid JSON" }, 400, noStoreHeaders()); }

      const role = body.role === "admin" || body.role === "seo_editor" ? body.role : null;
      if (!role) return json({ error: "role must be 'admin' or 'seo_editor'" }, 400, noStoreHeaders());

      const { data, error } = await supabaseAdmin
        .from("profiles")
        .update({ role })
        .eq("id", id)
        .select()
        .single();
      if (error) return json({ error: error.message }, 400, noStoreHeaders());
      return json({ ok: true, data }, 200, noStoreHeaders());
    }

    // PATCH – update email or password
    if (method === "PATCH") {
      if (!id) return json({ error: "id required" }, 400, noStoreHeaders());
      let body: { email?: string; password?: string };
      try { body = (await request.json()) as { email?: string; password?: string }; } catch { return json({ error: "Invalid JSON" }, 400, noStoreHeaders()); }

      // Update email
      if (body.email) {
        const { error: emailError } = await supabaseAdmin.auth.admin.updateUserById(id, { email: body.email });
        if (emailError) return json({ error: emailError.message }, 400, noStoreHeaders());
        await supabaseAdmin.from("profiles").update({ email: body.email }).eq("id", id);
      }
      // Update password
      if (body.password) {
        if (body.password.length < 8) return json({ error: "Password must be at least 8 characters" }, 400, noStoreHeaders());
        const { error: passError } = await supabaseAdmin.auth.admin.updateUserById(id, { password: body.password });
        if (passError) return json({ error: passError.message }, 400, noStoreHeaders());
      }
      return json({ ok: true }, 200, noStoreHeaders());
    }

    // DELETE – delete user
    if (method === "DELETE") {
      if (!id) return json({ error: "id required" }, 400, noStoreHeaders());
      // Prevent self-deletion
      if (id === user.id) {
        return json({ error: "Cannot delete your own account" }, 400, noStoreHeaders());
      }

      // Prevent deleting admin accounts
      const { data: targetProfile, error: profileError } = await supabaseAdmin
        .from("profiles")
        .select("role")
        .eq("id", id)
        .single();

      if (profileError) {
        return json({ error: profileError.message }, 400, noStoreHeaders());
      }
      if (targetProfile?.role === "admin") {
        return json({ error: "Admin users cannot be deleted" }, 400, noStoreHeaders());
      }

      const { error } = await supabaseAdmin.auth.admin.deleteUser(id);
      if (error) return json({ error: error.message }, 400, noStoreHeaders());
      return json({ ok: true }, 200, noStoreHeaders());
    }

    return json({ error: "Method not allowed" }, 405, { ...noStoreHeaders(), Allow: "GET, POST, PUT, DELETE" });
  },
};
