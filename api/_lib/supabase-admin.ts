// api/_lib/supabase-admin.ts
// Server-side Supabase client using service role key.
// NEVER import this in client/browser code.
import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.VITE_SUPABASE_URL ??
  process.env.SUPABASE_URL ??
  "";

const serviceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

if (!supabaseUrl || !serviceRoleKey) {
  console.error("[supabase-admin] Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
}

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// ---- Auth helpers ----

export interface AuthUser {
  id: string;
  email: string;
  role: "admin" | "seo_editor" | "pending";
}

/** Verify a Bearer token and return the user + role. Returns null if invalid. */
export const verifyAdminToken = async (
  request: Request
): Promise<AuthUser | null> => {
  const auth = request.headers.get("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  if (!token) return null;

  try {
    const {
      data: { user },
      error,
    } = await supabaseAdmin.auth.getUser(token);
    if (error || !user) return null;

    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!profile) return null;

    return {
      id: user.id,
      email: user.email ?? "",
      role: profile.role as "admin" | "seo_editor" | "pending",
    };
  } catch {
    return null;
  }
};
