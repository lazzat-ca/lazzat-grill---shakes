import { useState, useEffect, useCallback } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminApi } from "@/hooks/useAdminApi";
import { useAuthContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, X, ShieldAlert, Pencil } from "lucide-react";


type User = {
  id: string;
  email: string;
  role: "admin" | "seo_editor" | "pending";
  created_at: string;
};

const AdminUsers = () => {
  const { session } = useAuthContext();
  const api = useAdminApi();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [activeTab, setActiveTab] = useState<"pending" | "all">("pending");
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(null);
    api.getUsers()
      .then((data: User[]) => {
        setUsers(data);
        setPendingCount(data.filter((u) => u.role === "pending").length);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load users");
        setLoading(false);
      });
  }, []);

  const handleRoleChange = useCallback(async (userId: string, newRole: "admin" | "seo_editor") => {
    await api.updateUserRole(userId, newRole);
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
    setPendingCount((prev) => prev - 1);
  }, [api]);

  const handleDelete = useCallback(async (userId: string) => {
    await api.deleteUser(userId);
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  }, [api]);

  const openEditModal = (user: User) => {
    // Implement edit modal logic here
    alert(`Edit user: ${user.email}`);
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="font-serif text-2xl text-foreground">Users</h1>
          <span className="inline-flex items-center rounded-full border border-amber-700/50 bg-amber-950/40 px-3 py-1 text-xs font-semibold text-amber-300">
            Pending Users: {pendingCount}
          </span>
        </div>
        <Button onClick={() => setShowCreate(true)} size="sm">
          <Plus size={16} className="mr-1" /> Add User
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          className={`px-4 py-2 rounded-t-lg border-b-2 font-semibold transition-colors ${activeTab === "pending" ? "border-amber-400 text-amber-300 bg-amber-950/40" : "border-transparent text-muted-foreground bg-transparent hover:bg-white/5"}`}
          onClick={() => setActiveTab("pending")}
        >
          Pending Users
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg border-b-2 font-semibold transition-colors ${activeTab === "all" ? "border-primary text-primary bg-black/30" : "border-transparent text-muted-foreground bg-transparent hover:bg-white/5"}`}
          onClick={() => setActiveTab("all")}
        >
          All Users
        </button>
      </div>

      <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground bg-amber-950/20 border border-amber-800/30 rounded-lg px-4 py-2">
        <ShieldAlert size={16} className="text-amber-500 shrink-0" />
        Admin-only section. Changes take effect immediately.
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : error ? (
        <div className="text-destructive px-4 py-3">{error}</div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-primary/20">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-primary/20 bg-black/40 text-left text-muted-foreground">
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Joined</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(activeTab === "pending"
                ? users.filter((u) => u.role === "pending")
                : users
              ).map((u) => (
                <tr
                  key={u.id}
                  className={
                    u.role === "pending"
                      ? "border-b border-amber-700/30 bg-amber-950/20 hover:bg-amber-950/30"
                      : "border-b border-primary/10 hover:bg-white/5"
                  }
                >
                  <td className="px-4 py-3">{u.email}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {u.role === "pending" && (
                        <span className="inline-flex items-center rounded-full border border-amber-700/50 bg-amber-950/50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-300">
                          pending
                        </span>
                      )}
                      {u.role === "pending" ? (
                        <>
                          <span className="inline-flex items-center rounded-full border border-amber-700/50 bg-amber-950/50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-300">
                            pending
                          </span>
                          <select
                            value="pending"
                            onChange={(e) => {
                              const value = e.target.value as "admin" | "seo_editor";
                              void handleRoleChange(u.id, value);
                            }}
                            className="h-7 rounded border border-input bg-background px-2 text-xs ml-2"
                          >
                            <option value="pending" disabled>Approve as…</option>
                            <option value="admin">admin</option>
                            <option value="seo_editor">seo_editor</option>
                          </select>
                        </>
                      ) : (
                        <select
                          value={u.role}
                          onChange={(e) => {
                            const value = e.target.value as "admin" | "seo_editor";
                            void handleRoleChange(u.id, value);
                          }}
                          className="h-7 rounded border border-input bg-background px-2 text-xs"
                        >
                          <option value="admin">admin</option>
                          <option value="seo_editor">seo_editor</option>
                        </select>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(u.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-primary hover:text-primary"
                      title="Edit user"
                      onClick={() => openEditModal(u)}
                    >
                      <Pencil size={13} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive hover:text-destructive"
                      title={u.role === "admin" ? "Admin users cannot be deleted" : "Delete user"}
                      disabled={u.role === "admin"}
                      onClick={() => handleDelete(u.id)}
                    >
                      <Trash2 size={13} />
                    </Button>
                  </td>
                </tr>
              ))}
              {(activeTab === "pending"
                ? users.filter((u) => u.role === "pending").length === 0
                : users.length === 0
              ) && (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">No users found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminUsers;
