// src/pages/admin/AdminBlog.tsx
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminApi } from "@/hooks/useAdminApi";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import type { DbBlogPost } from "@/lib/supabase";

const AdminBlog = () => {
  const { request } = useAdminApi();
  const [posts, setPosts] = useState<DbBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error: err } = await request<DbBlogPost[]>("/api/admin/blog");
    setLoading(false);
    if (err) { setError(err); return; }
    setPosts(data ?? []);
  }, [request]);


  // Initial load
  useEffect(() => { void load(); }, [load]);

  // Supabase Realtime subscription for blog posts
  useEffect(() => {
    const channel = supabase
      .channel('public:blog')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'blog' }, payload => {
        // Refetch blog posts on any change
        void load();
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [load]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    const { error: err } = await request(`/api/admin/blog?id=${id}`, { method: "DELETE" });
    if (err) {
      toast({ title: "Delete failed", description: err, variant: "destructive" });
      return;
    }
    toast({ title: "Blog post deleted", description: "The post was removed successfully." });
    // No need to call load() here, realtime will update
  };

  // Show notification when a blog post is added (after save)
  const handleSave = async (post: Partial<DbBlogPost>, isNew: boolean) => {
    const { error: err } = await request(
      isNew ? "/api/admin/blog" : `/api/admin/blog?id=${post.id}`,
      { method: isNew ? "POST" : "PUT", body: JSON.stringify(post) }
    );
    if (err) { alert(`Save failed: ${err}`); return; }
    if (isNew) {
      toast({ title: "Blog post added", description: "A new blog post was created successfully." });
    }
    void load();
  };

  const togglePublish = async (post: DbBlogPost) => {
    const { error: err } = await request(`/api/admin/blog?id=${post.id}`, {
      method: "PUT",
      body: JSON.stringify({ published: !post.published }),
    });
    if (err) { alert(`Update failed: ${err}`); return; }
    void load();
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl text-foreground">Blog Posts</h1>
        <Button asChild size="sm">
          <Link to="/admin/blog/new"><Plus size={16} className="mr-1" /> New Post</Link>
        </Button>
      </div>

      {error && <p className="text-red-400 mb-4 text-sm">{error}</p>}

      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.id} className="flex items-center gap-4 border border-primary/20 rounded-xl p-4 bg-black/40 hover:border-primary/40 transition-colors">
              {post.image && (
                <img
                  src={post.image}
                  alt={post.image_alt || post.title}
                  className="h-16 w-24 object-cover rounded-lg shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="font-semibold truncate">{post.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${post.published ? "bg-green-950/40 border-green-700/40 text-green-400" : "bg-amber-950/40 border-amber-700/40 text-amber-400"}`}>
                    {post.published ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1">{post.excerpt}</p>
                <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                  <span>{post.author}</span>
                  <span>·</span>
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.category}</span>
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  title={post.published ? "Unpublish" : "Publish"}
                  onClick={() => togglePublish(post)}
                >
                  {post.published ? <EyeOff size={14} /> : <Eye size={14} />}
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                  <Link to={`/admin/blog/${post.id}`}><Pencil size={14} /></Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive"
                  onClick={() => handleDelete(post.id)}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          ))}
          {posts.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No blog posts yet.{" "}
              <Link to="/admin/blog/new" className="text-primary underline">Create your first post</Link>
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminBlog;
