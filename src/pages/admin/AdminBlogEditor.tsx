// src/pages/admin/AdminBlogEditor.tsx
// Simple but complete blog post editor with:
// - Content blocks (heading, paragraph, image)
// - Hero image + alt text
// - SEO metadata, excerpt, author, date, read time
// - Publish toggle
// - Live preview
import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminApi } from "@/hooks/useAdminApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { type DbBlogPost } from "@/lib/supabase";
// Removed LazzatBlogEditor import; reverting to block-based editor
import { Plus, Trash2, ArrowUp, ArrowDown, Eye, EyeOff, Save, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = ["Cooking Techniques", "Culinary Culture", "Sustainability", "Health & Wellness", "Stories", "News"];

type EditorPost = Omit<DbBlogPost, "created_at" | "updated_at">;

const blank = (): EditorPost => ({
  id: "",
  title: "",
  excerpt: "",
  content: "",
  author: "",
  date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
  category: CATEGORIES[0],
  read_time: "5 min",
  image: "",
  image_alt: "",
  seo_title: "",
  seo_description: "",
  published: false,
});

// ---- Block editors ----

const HeadingEditor = ({ block, onChange, onRemove, onMoveUp, onMoveDown }: {
  block: Extract<BlogBlock, { type: "heading" }>;
  onChange: (b: BlogBlock) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) => (
  <div className="border border-primary/20 rounded-lg p-3 space-y-2 bg-black/30">
    <div className="flex items-center gap-2">
      <span className="text-xs text-primary font-mono px-1.5 py-0.5 bg-primary/10 rounded">H{block.level}</span>
      <select
        value={block.level}
        onChange={(e) => onChange({ ...block, level: parseInt(e.target.value) as 1|2|3 })}
        className="h-6 text-xs rounded border border-input bg-background px-1"
      >
        <option value={1}>H1</option>
        <option value={2}>H2</option>
        <option value={3}>H3</option>
      </select>
      <div className="flex gap-1 ml-auto">
        <button type="button" onClick={onMoveUp} className="p-1 rounded hover:bg-white/10"><ArrowUp size={12} /></button>
        <button type="button" onClick={onMoveDown} className="p-1 rounded hover:bg-white/10"><ArrowDown size={12} /></button>
        <button type="button" onClick={onRemove} className="p-1 rounded hover:bg-red-950/40 text-destructive"><Trash2 size={12} /></button>
      </div>
    </div>
    <Input
      value={block.text}
      onChange={(e) => onChange({ ...block, text: e.target.value })}
      placeholder="Heading text…"
      className={cn("font-semibold", block.level === 1 && "text-xl", block.level === 2 && "text-lg")}
    />
  </div>
);

const ParagraphEditor = ({ block, onChange, onRemove, onMoveUp, onMoveDown }: {
  block: Extract<BlogBlock, { type: "paragraph" }>;
  onChange: (b: BlogBlock) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) => (
  <div className="border border-primary/20 rounded-lg p-3 space-y-2 bg-black/30">
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground font-mono px-1.5 py-0.5 bg-white/5 rounded">¶ Paragraph</span>
      <div className="flex gap-1 ml-auto">
        <button type="button" onClick={onMoveUp} className="p-1 rounded hover:bg-white/10"><ArrowUp size={12} /></button>
        <button type="button" onClick={onMoveDown} className="p-1 rounded hover:bg-white/10"><ArrowDown size={12} /></button>
        <button type="button" onClick={onRemove} className="p-1 rounded hover:bg-red-950/40 text-destructive"><Trash2 size={12} /></button>
      </div>
    </div>
    <Textarea
      value={block.text}
      onChange={(e) => onChange({ ...block, text: e.target.value })}
      placeholder="Write your paragraph…"
      rows={3}
    />
  </div>
);

const ImageBlockEditor = ({ block, onChange, onRemove, onMoveUp, onMoveDown }: {
  block: Extract<BlogBlock, { type: "image" }>;
  onChange: (b: BlogBlock) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) => (
  <div className="border border-primary/20 rounded-lg p-3 space-y-2 bg-black/30">
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground font-mono px-1.5 py-0.5 bg-white/5 rounded">🖼 Image</span>
      <div className="flex gap-1 ml-auto">
        <button type="button" onClick={onMoveUp} className="p-1 rounded hover:bg-white/10"><ArrowUp size={12} /></button>
        <button type="button" onClick={onMoveDown} className="p-1 rounded hover:bg-white/10"><ArrowDown size={12} /></button>
        <button type="button" onClick={onRemove} className="p-1 rounded hover:bg-red-950/40 text-destructive"><Trash2 size={12} /></button>
      </div>
    </div>
    <ImageUpload
      value={block.src}
      onChange={(url) => onChange({ ...block, src: url })}
      label="Block Image (max 45 KB)"
    />
    <div className="space-y-1">
      <Label className="text-xs">Alt text (required for accessibility)</Label>
      <Input
        value={block.alt}
        onChange={(e) => onChange({ ...block, alt: e.target.value })}
        placeholder="Describe this image for screen readers…"
      />
    </div>
  </div>
);

// ---- Preview renderer ----
const BlocksPreview = ({ blocks, title, post }: { blocks: BlogBlock[]; title: string; post: EditorPost }) => (
  <article className="prose prose-invert max-w-none">
    {post.image && (
      <img src={post.image} alt={post.image_alt || title} className="w-full h-48 object-cover rounded-xl mb-4" />
    )}
    <h1 className="font-serif text-2xl text-foreground">{title || "Untitled"}</h1>
    <p className="text-sm text-muted-foreground">
      {post.author} · {post.date} · {post.read_time}
    </p>
    {post.excerpt && <p className="text-muted-foreground italic">{post.excerpt}</p>}
    <hr className="border-primary/20 my-4" />
    {blocks.map((block, i) => {
      if (block.type === "heading") {
        const Tag = `h${block.level}` as "h1" | "h2" | "h3";
        return <Tag key={i} className="font-serif text-foreground">{block.text}</Tag>;
      }
      if (block.type === "paragraph") {
        return <p key={i} className="text-foreground/80">{block.text}</p>;
      }
      if (block.type === "image") {
        return (
          <figure key={i} className="my-4">
            {block.src && <img src={block.src} alt={block.alt} className="rounded-lg w-full" />}
            {block.alt && <figcaption className="text-xs text-center text-muted-foreground mt-1">{block.alt}</figcaption>}
          </figure>
        );
      }
      return null;
    })}
  </article>
);

// ---- Main Editor ----

const AdminBlogEditor = () => {
  const { id } = useParams<{ id: string }>();
  const isNew = !id || id === "new";
  const navigate = useNavigate();
  const { request } = useAdminApi();

  const [post, setPost] = useState<EditorPost>(blank());
  // Block-based editor state
  type BlogBlock =
    | { type: "heading"; level: 1 | 2 | 3; text: string }
    | { type: "paragraph"; text: string }
    | { type: "image"; src: string; alt: string };
  const [blocks, setBlocks] = useState<BlogBlock[]>([]);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [activeSection, setActiveSection] = useState<"content" | "meta" | "seo">("content");

  const load = useCallback(async () => {
    if (isNew) return;
    setLoading(true);
    const { data, error } = await request<DbBlogPost>(`/api/admin/blog?id=${id}`);
    setLoading(false);
    if (error || !data) { alert(`Failed to load post: ${error}`); navigate("/admin/blog"); return; }
    setPost(data);
    try {
      setBlocks(JSON.parse(data.content));
    } catch {
      setBlocks([]);
    }
  }, [id, isNew, navigate, request]);

  useEffect(() => { void load(); }, [load]);

  const setField = <K extends keyof EditorPost>(key: K, value: EditorPost[K]) =>
    setPost((prev) => ({ ...prev, [key]: value }));

  const addBlock = (type: BlogBlock["type"]) => {
    const newBlock: BlogBlock =
      type === "heading" ? { type: "heading", level: 2, text: "" }
      : type === "image" ? { type: "image", src: "", alt: "" }
      : { type: "paragraph", text: "" };
    setBlocks((prev) => [...prev, newBlock]);
  };

  const updateBlock = (index: number, block: BlogBlock) =>
    setBlocks((prev) => prev.map((b, i) => (i === index ? block : b)));

  const removeBlock = (index: number) =>
    setBlocks((prev) => prev.filter((_, i) => i !== index));

  const moveBlock = (index: number, dir: -1 | 1) => {
    setBlocks((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const handleSave = async () => {
    if (!post.title.trim()) { alert("Title is required"); return; }
    setSaving(true);
    const payload = { ...post, content: JSON.stringify(blocks) };
    const { error } = await request(
      isNew ? "/api/admin/blog" : `/api/admin/blog?id=${post.id}`,
      { method: isNew ? "POST" : "PUT", body: JSON.stringify(payload) }
    );
    setSaving(false);
    if (error) { alert(`Save failed: ${error}`); return; }
    navigate("/admin/blog");
  };


  if (loading) return <AdminLayout><p className="text-muted-foreground">Loading…</p></AdminLayout>;

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/blog")}><ArrowLeft size={16} /></Button>
        <h1 className="font-serif text-2xl text-foreground flex-1">
          {isNew ? "New Post" : "Edit Post"}
        </h1>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setField("published", !post.published)}
        >
          {post.published ? <><EyeOff size={14} className="mr-1" /> Unpublish</> : <><Eye size={14} className="mr-1" /> Publish</>}
        </Button>
        <Button size="sm" onClick={handleSave} disabled={saving}>
          <Save size={14} className="mr-1" />
          {saving ? "Saving…" : "Save"}
        </Button>
      </div>

      {/* Published badge */}
      {post.published && (
        <div className="mb-4 text-xs px-3 py-1.5 bg-green-950/40 border border-green-700/30 rounded-lg text-green-400 inline-block">
          ✓ This post is published and visible to readers
        </div>
      )}

      {/* Title */}
      <div className="mb-4">
        <Input
          value={post.title}
          onChange={(e) => setField("title", e.target.value)}
          placeholder="Post title…"
          className="text-xl font-serif border-0 border-b border-primary/20 rounded-none bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary"
        />
      </div>

      {/* Block-based Blog Editor */}
      <div className="mb-6 space-y-4">
        {blocks.map((block, i) => {
          if (block.type === "heading") {
            return (
              <HeadingEditor
                key={i}
                block={block}
                onChange={(b) => updateBlock(i, b)}
                onRemove={() => removeBlock(i)}
                onMoveUp={() => moveBlock(i, -1)}
                onMoveDown={() => moveBlock(i, 1)}
              />
            );
          }
          if (block.type === "paragraph") {
            return (
              <ParagraphEditor
                key={i}
                block={block}
                onChange={(b) => updateBlock(i, b)}
                onRemove={() => removeBlock(i)}
                onMoveUp={() => moveBlock(i, -1)}
                onMoveDown={() => moveBlock(i, 1)}
              />
            );
          }
          if (block.type === "image") {
            return (
              <ImageBlockEditor
                key={i}
                block={block}
                onChange={(b) => updateBlock(i, b)}
                onRemove={() => removeBlock(i)}
                onMoveUp={() => moveBlock(i, -1)}
                onMoveDown={() => moveBlock(i, 1)}
              />
            );
          }
          return null;
        })}
        <div className="flex gap-2 mt-2">
          <Button size="sm" variant="outline" onClick={() => addBlock("heading")}>Add Heading</Button>
          <Button size="sm" variant="outline" onClick={() => addBlock("paragraph")}>Add Paragraph</Button>
          <Button size="sm" variant="outline" onClick={() => addBlock("image")}>Add Image</Button>
        </div>
      </div>

      {/* Live Preview */}
      <div className="mb-8">
        <Label className="mb-2 block">Live Preview</Label>
        <BlocksPreview blocks={blocks} title={post.title} post={post} />
      </div>

      {/* Meta/SEO fields below the editor */}
      <div className="flex gap-6">
        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Author</Label>
              <Input value={post.author} onChange={(e) => setField("author", e.target.value)} placeholder="Chef Hassan" />
            </div>
            <div className="space-y-1">
              <Label>Date</Label>
              <Input value={post.date} onChange={(e) => setField("date", e.target.value)} placeholder="April 13, 2026" />
            </div>
            <div className="space-y-1">
              <Label>Category</Label>
              <select
                value={post.category}
                onChange={(e) => setField("category", e.target.value)}
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
              >
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <Label>Read Time</Label>
              <Input value={post.read_time} onChange={(e) => setField("read_time", e.target.value)} placeholder="5 min" />
            </div>
          </div>
          <div className="space-y-1">
            <Label>Excerpt</Label>
            <Textarea
              value={post.excerpt}
              onChange={(e) => setField("excerpt", e.target.value)}
              rows={3}
              placeholder="Brief summary shown in the blog list…"
            />
          </div>
          <ImageUpload
            value={post.image}
            onChange={(url) => setField("image", url)}
            label="Hero Image (max 45 KB)"
          />
          <div className="space-y-1">
            <Label>Hero Image Alt Text</Label>
            <Input
              value={post.image_alt}
              onChange={(e) => setField("image_alt", e.target.value)}
              placeholder="Describe the hero image for screen readers…"
            />
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <div className="space-y-1">
            <Label>SEO Title</Label>
            <Input
              value={post.seo_title}
              onChange={(e) => setField("seo_title", e.target.value)}
              placeholder="Custom page title for search engines (optional)"
            />
            <p className="text-xs text-muted-foreground">{post.seo_title.length}/60 characters</p>
          </div>
          <div className="space-y-1">
            <Label>SEO Description</Label>
            <Textarea
              value={post.seo_description}
              onChange={(e) => setField("seo_description", e.target.value)}
              rows={3}
              placeholder="Meta description shown in search results (optional)"
            />
            <p className="text-xs text-muted-foreground">{post.seo_description.length}/160 characters</p>
          </div>
          {/* Preview snippet */}
          {(post.seo_title || post.title) && (
            <div className="border border-primary/20 rounded-lg p-4 space-y-1 bg-black/30">
              <p className="text-xs text-muted-foreground mb-2">Search preview:</p>
              <p className="text-blue-400 text-sm font-medium">{post.seo_title || post.title}</p>
              <p className="text-xs text-green-600">https://lazzat.ca/blog/{post.id || "new-post"}</p>
              <p className="text-xs text-muted-foreground">{post.seo_description || post.excerpt}</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminBlogEditor;
