// src/pages/admin/AdminMenu.tsx
import { useState, useEffect, useCallback } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminApi } from "@/hooks/useAdminApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, Pencil, Trash2, X, Flame } from "lucide-react";
// Allergen options (same as AdminSauces)
const ALLERGEN_OPTIONS = [
  "milk", "eggs", "gluten", "soy", "sesame", "peanuts", "tree-nuts", "shellfish", "fish", "mustard"
];
import type { DbMenuItem } from "@/lib/supabase";

const CATEGORIES = [
  "Grills & Skewers", "Döner", "Wraps", "Biryani", "Sajji",
  "Desserts", "Shakes & Juices", "Sides",
];

const emptyItem = (): Omit<DbMenuItem, "id" | "created_at" | "updated_at"> => ({
  name: "", description: "", price: null, image: "", image_alt: "",
  category: CATEGORIES[0], sub_category: null, heat_level: 0,
  is_new: false, is_popular: false,
  sauce_pairings: [], side_pairings: [], customizations: [],
  allergens: [], dietary: [], flavors: [], textures: [], side_type: null,
});

const AdminMenu = () => {
  const { request } = useAdminApi();
  const [items, setItems] = useState<DbMenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Partial<DbMenuItem> | null>(null);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState(CATEGORIES[0]);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error: err } = await request<DbMenuItem[]>("/api/admin/menu");
    setLoading(false);
    if (err) { setError(err); return; }
    setItems(data ?? []);
  }, [request]);

  useEffect(() => { void load(); }, [load]);

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    const isNew = !editing.id;
    const { error: err } = await request(
      isNew ? "/api/admin/menu" : `/api/admin/menu?id=${editing.id}`,
      { method: isNew ? "POST" : "PUT", body: JSON.stringify(editing) }
    );
    setSaving(false);
    if (err) { alert(`Save failed: ${err}`); return; }
    setEditing(null);
    void load();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this menu item?")) return;
    const { error: err } = await request(`/api/admin/menu?id=${id}`, { method: "DELETE" });
    if (err) { alert(`Delete failed: ${err}`); return; }
    void load();
  };

  const filtered = items.filter((it) => {
    const matchCat = filterCat === "All" || it.category === filterCat;
    const matchSearch = !search || it.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const setField = <K extends keyof DbMenuItem>(key: K, value: DbMenuItem[K]) => {
    setEditing((prev) => prev ? { ...prev, [key]: value } : prev);
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl text-foreground">Menu Items</h1>
        <Button onClick={() => setEditing(emptyItem())} size="sm">
          <Plus size={16} className="mr-1" /> Add Item
        </Button>
      </div>

      {error && <p className="text-red-400 mb-4 text-sm">{error}</p>}

      {/* Category Tabs */}
      <Tabs value={filterCat} onValueChange={setFilterCat} className="mb-4">
        <TabsList>
          {CATEGORIES.map((cat) => (
            <TabsTrigger key={cat} value={cat} className="capitalize">
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Filters */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <Input
          placeholder="Search…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-48 h-8 text-sm"
        />
        <span className="text-muted-foreground text-sm self-center">{filtered.length} items</span>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-primary/20">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-primary/20 bg-black/40 text-left text-muted-foreground">
                <th className="px-3 py-2">Image</th>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Category</th>
                <th className="px-3 py-2">Heat</th>
                <th className="px-3 py-2">Price</th>
                <th className="px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-primary/10 hover:bg-white/5">
                  <td className="px-3 py-2">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.image_alt || item.name}
                        className="h-10 w-14 object-cover rounded"
                        onError={e => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/assets/placeholder.svg";
                          console.error("AdminMenu image failed to load:", item.name, item.image);
                        }}
                      />
                    ) : (
                      <img src="/assets/placeholder.svg" alt="No image" className="h-10 w-14 object-cover rounded opacity-60" />
                    )}
                  </td>
                  <td className="px-3 py-2 font-medium">{item.name}</td>
                  <td className="px-3 py-2 text-muted-foreground">{item.category}</td>
                  <td className="px-3 py-2">
                    <span className="flex items-center gap-0.5">
                      {Array.from({ length: Math.min(item.heat_level, 5) }).map((_, i) => (
                        <Flame key={i} size={12} className="text-orange-500" />
                      ))}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-muted-foreground">
                    {item.price != null ? `$${item.price}` : "—"}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setEditing(item)}>
                        <Pencil size={13} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => handleDelete(item.id)}>
                        <Trash2 size={13} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-3 py-8 text-center text-muted-foreground">No items found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background border border-primary/30 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl">{editing.id ? "Edit Item" : "New Item"}</h2>
              <Button variant="ghost" size="icon" onClick={() => setEditing(null)}><X size={16} /></Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Name *</Label>
                <Input value={editing.name ?? ""} onChange={(e) => setField("name", e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label>Category *</Label>
                <select
                  value={editing.category ?? ""}
                  onChange={(e) => setField("category", e.target.value)}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                >
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-1 col-span-2">
                <Label>Description</Label>
                <Textarea value={editing.description ?? ""} onChange={(e) => setField("description", e.target.value)} rows={2} />
              </div>

              {/* Allergens */}
              <div className="space-y-1 col-span-2">
                <Label>Allergens</Label>
                <div className="flex flex-wrap gap-2">
                  {ALLERGEN_OPTIONS.map((a) => (
                    <label key={a} className="flex items-center gap-1.5 text-sm cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={(editing.allergens ?? []).includes(a)}
                        onChange={() => {
                          const current = editing.allergens ?? [];
                          setField(
                            "allergens",
                            current.includes(a)
                              ? current.filter((x) => x !== a)
                              : [...current, a]
                          );
                        }}
                        className="rounded"
                      />
                      {a}
                    </label>
                  ))}
                </div>
              </div>
              <div className="space-y-1">
                <Label>Price ($)</Label>
                <Input type="number" step="0.01" value={editing.price ?? ""} onChange={(e) => setField("price", e.target.value ? parseFloat(e.target.value) : null)} />
              </div>
              <div className="space-y-1">
                <Label>Heat Level (0–10)</Label>
                <Input type="number" min={0} max={10} value={editing.heat_level ?? 0} onChange={(e) => setField("heat_level", parseInt(e.target.value) || 0)} />
              </div>
              <div className="space-y-1">
                <Label>Sub Category</Label>
                <Input value={editing.sub_category ?? ""} onChange={(e) => setField("sub_category", e.target.value || null)} />
              </div>
              <div className="space-y-1">
                <Label>Image Alt Text</Label>
                <Input value={editing.image_alt ?? ""} onChange={(e) => setField("image_alt", e.target.value)} placeholder="Describe this image for screen readers" />
              </div>
              <div className="col-span-2">
                <ImageUpload
                  value={editing.image ?? ""}
                  onChange={(url) => setField("image", url)}
                  label="Item Image (max 45 KB)"
                />
                <p className="text-xs text-muted-foreground mt-1">Image must be JPEG/PNG/WebP/GIF and strictly under 45 KB. Larger images will be rejected.</p>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer select-none text-sm">
                  <input type="checkbox" checked={editing.is_new ?? false} onChange={(e) => setField("is_new", e.target.checked)} className="rounded" />
                  Mark as New
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none text-sm">
                  <input type="checkbox" checked={editing.is_popular ?? false} onChange={(e) => setField("is_popular", e.target.checked)} className="rounded" />
                  Mark as Popular
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-primary/20">
              <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
              <Button onClick={handleSave} disabled={saving || !editing.name || !editing.image}>
                {saving ? "Saving…" : "Save"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminMenu;
