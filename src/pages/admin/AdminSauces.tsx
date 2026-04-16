// src/pages/admin/AdminSauces.tsx
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminApi } from "@/hooks/useAdminApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import type { DbSauce } from "@/lib/supabase";

const ALLERGEN_OPTIONS = ["milk", "eggs", "gluten", "soy", "sesame", "peanuts", "tree-nuts", "shellfish", "fish", "mustard"];

const emptySauce = (): Omit<DbSauce, "id" | "created_at" | "updated_at"> => ({
  name: "", description: "", level: 0, image: "", allergens: [],
});

const AdminSauces = () => {
  const { request } = useAdminApi();
  const [items, setItems] = useState<DbSauce[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<DbSauce> | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error: err } = await request<DbSauce[]>("/api/admin/sauces");
    setLoading(false);
    if (err) { setError(err); return; }
    setItems(data ?? []);
  }, [request]);


  // Initial load
  useEffect(() => { void load(); }, [load]);

  // Supabase Realtime subscription for sauces
  useEffect(() => {
    const channel = supabase
      .channel('public:sauces')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'sauces' }, payload => {
        // Refetch sauces on any change
        void load();
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [load]);

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    const isNew = !editing.id;
    const { error: err } = await request(
      isNew ? "/api/admin/sauces" : `/api/admin/sauces?id=${editing.id}`,
      { method: isNew ? "POST" : "PUT", body: JSON.stringify(editing) }
    );
    setSaving(false);
    if (err) { alert(`Save failed: ${err}`); return; }
    setEditing(null);
    if (isNew) {
      toast({ title: "Sauce added", description: "A new sauce was created successfully." });
    }
    void load();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this sauce?")) return;
    const { error: err } = await request(`/api/admin/sauces?id=${id}`, { method: "DELETE" });
    if (err) {
      toast({ title: "Delete failed", description: err, variant: "destructive" });
      return;
    }
    toast({ title: "Sauce deleted", description: "The sauce was removed successfully." });
    // No need to call load() here, realtime will update
  };

  const setField = <K extends keyof DbSauce>(key: K, value: DbSauce[K]) =>
    setEditing((prev) => prev ? { ...prev, [key]: value } : prev);

  const toggleAllergen = (allergen: string) => {
    const current = editing?.allergens ?? [];
    setField("allergens", current.includes(allergen)
      ? current.filter((a) => a !== allergen)
      : [...current, allergen]
    );
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl text-foreground">Sauces</h1>
        <Button onClick={() => setEditing(emptySauce())} size="sm">
          <Plus size={16} className="mr-1" /> Add Sauce
        </Button>
      </div>

      {error && <p className="text-red-400 mb-4 text-sm">{error}</p>}

      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((sauce) => (
            <div key={sauce.id} className="border border-primary/20 rounded-xl p-4 bg-black/40 space-y-2">
              {sauce.image && (
                <img src={sauce.image} alt={sauce.name} className="h-24 w-full object-cover rounded-lg" />
              )}
              <h3 className="font-semibold">{sauce.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{sauce.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Heat: {sauce.level}/10</span>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setEditing(sauce)}>
                    <Pencil size={13} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => handleDelete(sauce.id)}>
                    <Trash2 size={13} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <p className="text-muted-foreground col-span-3 py-8 text-center">No sauces yet. Add one!</p>
          )}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-background border border-primary/30 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl">{editing.id ? "Edit Sauce" : "New Sauce"}</h2>
              <Button variant="ghost" size="icon" onClick={() => setEditing(null)}><X size={16} /></Button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <Label>Name *</Label>
                <Input value={editing.name ?? ""} onChange={(e) => setField("name", e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label>Description</Label>
                <Textarea value={editing.description ?? ""} onChange={(e) => setField("description", e.target.value)} rows={2} />
              </div>
              <div className="space-y-1">
                <Label>Heat Level (0–10)</Label>
                <Input type="number" min={0} max={10} value={editing.level ?? 0} onChange={(e) => setField("level", parseInt(e.target.value) || 0)} />
              </div>
              <ImageUpload value={editing.image ?? ""} onChange={(url) => setField("image", url)} label="Sauce Image" />
              <div className="space-y-2">
                <Label>Allergens</Label>
                <div className="flex flex-wrap gap-2">
                  {ALLERGEN_OPTIONS.map((a) => (
                    <label key={a} className="flex items-center gap-1.5 text-sm cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={(editing.allergens ?? []).includes(a)}
                        onChange={() => toggleAllergen(a)}
                        className="rounded"
                      />
                      {a}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-primary/20">
              <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
              <Button onClick={handleSave} disabled={saving || !editing.name}>
                {saving ? "Saving…" : "Save"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminSauces;
