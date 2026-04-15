// src/pages/admin/AdminUsers.tsx
import { useState, useEffect, useCallback } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminApi } from "@/hooks/useAdminApi";
import { useAuthContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, X, ShieldAlert, Pencil } from "lucide-react";
  const [editUser, setEditUser] = useState<DbProfile | null>(null);
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const openEditModal = (user: DbProfile) => {
    setEditUser(user);
    setEditEmail(user.email);
    setEditPassword("");
    setEditError(null);
  };

  const closeEditModal = () => {
    setEditUser(null);
    setEditEmail("");
    setEditPassword("");
    setEditError(null);
  };

  const handleEditSave = async () => {
    if (!editUser) return;
    setEditLoading(true);
    setEditError(null);
    const patch: { email?: string; password?: string } = {};
    if (editEmail && editEmail !== editUser.email) patch.email = editEmail;
    if (editPassword) patch.password = editPassword;
    if (!patch.email && !patch.password) {
      setEditError("No changes to save.");
      setEditLoading(false);
      return;
    }
    const { error: err } = await request(`/api/admin/users?id=${editUser.id}`, {
      method: "PATCH",
      body: JSON.stringify(patch),
    });
    setEditLoading(false);
    if (err) { setEditError(err); return; }
    closeEditModal();
    void load();
  };
import { useNavigate } from "react-router-dom";
import type { DbProfile } from "@/lib/supabase";

const AdminUsers = () => {
  const { request } = useAdminApi();
  const { isAdmin } = useAuthContext();
  const navigate = useNavigate();
  const [users, setUsers] = useState<DbProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  // New users are always created as 'pending' now
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const pendingCount = users.filter((u) => u.role === "pending").length;

  // Guard: redirect non-admins
  useEffect(() => {
    if (!isAdmin) navigate("/admin");
  }, [isAdmin, navigate]);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error: err } = await request<DbProfile[]>("/api/admin/users");
    setLoading(false);
    if (err) { setError(err); return; }
    setUsers(data ?? []);
  }, [request]);

  useEffect(() => { void load(); }, [load]);

  const handleCreate = async () => {
    setCreateError(null);
    if (!newEmail.trim() || !newPassword) return;
    setCreating(true);
    // No role sent: backend will default to 'pending'
    const { error: err } = await request("/api/admin/users", {
      method: "POST",
      body: JSON.stringify({ email: newEmail.trim(), password: newPassword }),
    });
    setCreating(false);
    if (err) { setCreateError(err); return; }
    setShowCreate(false);
    setNewEmail("");
    setNewPassword("");
    void load();
  };

  const handleRoleChange = async (userId: string, role: "admin" | "seo_editor") => {
    // Only allow approving pending users to admin or seo_editor
    const { error: err } = await request(`/api/admin/users?id=${userId}`, {
      method: "PUT",
      body: JSON.stringify({ role }),
    });
    if (err) { alert(`Update failed: ${err}`); return; }
    void load();
  };

  const handleDelete = async (userId: string) => {
    if (!confirm("Delete this user? This cannot be undone.")) return;
    const { error: err } = await request(`/api/admin/users?id=${userId}`, { method: "DELETE" });
    if (err) { alert(`Delete failed: ${err}`); return; }
    void load();
  };

  if (!isAdmin) return null;

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

      {error && <p className="text-red-400 mb-4 text-sm">{error}</p>}

      <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground bg-amber-950/20 border border-amber-800/30 rounded-lg px-4 py-2">
        <ShieldAlert size={16} className="text-amber-500 shrink-0" />
        Admin-only section. Changes take effect immediately.
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
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
              {users.map((u) => (
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
                      {/* Edit User Modal */}
                      {editUser && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                          <div className="w-full max-w-sm bg-background border border-primary/30 rounded-xl p-6 space-y-4">
                            <div className="flex items-center justify-between">
                              <h2 className="font-serif text-xl">Edit User</h2>
                              <Button variant="ghost" size="icon" onClick={closeEditModal}><X size={16} /></Button>
                            </div>
                            <div className="space-y-3">
                              <div className="space-y-1">
                                <Label>Email</Label>
                                <Input type="email" value={editEmail} onChange={e => setEditEmail(e.target.value)} />
                              </div>
                              <div className="space-y-1">
                                <Label>New Password <span className="text-muted-foreground">(leave blank to keep unchanged)</span></Label>
                                <Input type="password" value={editPassword} onChange={e => setEditPassword(e.target.value)} />
                              </div>
                              {editError && (
                                <p className="text-sm text-red-400 bg-red-950/40 border border-red-800/30 rounded px-3 py-2">{editError}</p>
                              )}
                            </div>
                            <div className="flex justify-end gap-2 pt-2 border-t border-primary/20">
                              <Button variant="outline" onClick={closeEditModal}>Cancel</Button>
                              <Button onClick={handleEditSave} disabled={editLoading || (!editEmail && !editPassword)}>
                                {editLoading ? "Saving…" : "Save Changes"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                </tr>
              ))}
              {users.length === 0 && (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">No users found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Create modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-background border border-primary/30 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl">New User</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowCreate(false)}><X size={16} /></Button>
            </div>
            <div className="space-y-3">
              <div className="space-y-1">
                <Label>Email *</Label>
                <Input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label>Password * (min 8 chars)</Label>
                <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              </div>
              {/* Role selection removed: new users are always pending */}
              {createError && (
                <p className="text-sm text-red-400 bg-red-950/40 border border-red-800/30 rounded px-3 py-2">{createError}</p>
              )}
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-primary/20">
              <Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
              <Button onClick={handleCreate} disabled={creating || !newEmail || !newPassword}>
                {creating ? "Creating…" : "Create"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminUsers;
