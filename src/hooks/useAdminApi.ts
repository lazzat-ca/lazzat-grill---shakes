// src/hooks/useAdminApi.ts
// Shared hook for admin API calls with auth headers.
import { useAuthContext } from "@/context/AuthContext";
import { useCallback } from "react";

export const useAdminApi = () => {
  const { accessToken } = useAuthContext();

  const request = useCallback(
    async <T>(
      path: string,
      options?: RequestInit
    ): Promise<{ data: T | null; error: string | null }> => {
      try {
        const res = await fetch(path, {
          ...options,
          headers: {
            "Content-Type": "application/json",
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
            ...(options?.headers ?? {}),
          },
        });

        let json: Record<string, unknown>;
        try {
          json = (await res.json()) as Record<string, unknown>;
        } catch {
          return { data: null, error: `HTTP ${res.status}` };
        }

        if (!res.ok) {
          return { data: null, error: (json.error as string) ?? `HTTP ${res.status}` };
        }

        return { data: (json.data ?? json) as T, error: null };
      } catch (err) {
        return { data: null, error: err instanceof Error ? err.message : "Network error" };
      }
    },
    [accessToken]
  );

  // Admin API helpers
  const getUsers = useCallback(async () => {
    const { data, error } = await request<any[]>("/api/admin/users");
    if (error) throw new Error(error);
    return data || [];
  }, [request]);

  const updateUserRole = useCallback(async (userId: string, newRole: "admin" | "seo_editor") => {
    const { error } = await request(`/api/admin/users?id=${userId}`, {
      method: "PUT",
      body: JSON.stringify({ role: newRole }),
    });
    if (error) throw new Error(error);
  }, [request]);

  const deleteUser = useCallback(async (userId: string) => {
    const { error } = await request(`/api/admin/users?id=${userId}`, {
      method: "DELETE",
    });
    if (error) throw new Error(error);
  }, [request]);

  return { request, getUsers, updateUserRole, deleteUser };
};
