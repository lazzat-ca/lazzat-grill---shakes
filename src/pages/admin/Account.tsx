// src/pages/admin/Account.tsx
import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAuthContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

const Account = () => {
  const { profile, user, request, loadProfile } = useAuthContext();
  const [showModal, setShowModal] = useState(true);
  const [email, setEmail] = useState(profile?.email || user?.email || "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    const patch: { email?: string; password?: string } = {};
    if (email && email !== (profile?.email || user?.email)) patch.email = email;
    if (password) patch.password = password;
    if (!patch.email && !patch.password) {
      setError("No changes to save.");
      setLoading(false);
      return;
    }
    const { error: err } = await request(`/api/admin/users?id=${user?.id}`, {
      method: "PATCH",
      body: JSON.stringify(patch),
    });
    setLoading(false);
    if (err) { setError(err); return; }
    setSuccess("Account updated successfully.");
    setPassword("");
    loadProfile && loadProfile();
  };

  if (!showModal) return null;

  return (
    <AdminLayout>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
        <div className="w-full max-w-sm bg-background border border-primary/30 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl">Edit Account</h2>
            <Button variant="ghost" size="icon" onClick={() => setShowModal(false)}><X size={16} /></Button>
          </div>
          <div className="space-y-3">
            <div className="space-y-1">
              <Label>Email</Label>
              <Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>New Password <span className="text-muted-foreground">(leave blank to keep unchanged)</span></Label>
              <Input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            {error && (
              <p className="text-sm text-red-400 bg-red-950/40 border border-red-800/30 rounded px-3 py-2">{error}</p>
            )}
            {success && (
              <p className="text-sm text-green-400 bg-green-950/40 border border-green-800/30 rounded px-3 py-2">{success}</p>
            )}
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-primary/20">
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={loading || (!email && !password)}>
              {loading ? "Saving…" : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Account;
