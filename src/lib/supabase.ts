// src/lib/supabase.ts
// Browser-side Supabase client (uses anon/public key only)
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY environment variables"
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// ---- DB row types matching schema.sql ----

export interface DbMenuItem {
  id: number;
  name: string;
  description: string;
  price: number | null;
  image: string;
  image_alt: string;
  category: string;
  sub_category: string | null;
  heat_level: number;
  is_new: boolean;
  is_popular: boolean;
  sauce_pairings: string[];
  side_pairings: string[];
  customizations: string[];
  allergens: string[];
  dietary: string[];
  flavors: string[];
  textures: string[];
  side_type: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbSauce {
  id: number;
  name: string;
  description: string;
  level: number;
  image: string;
  allergens: string[];
  created_at: string;
  updated_at: string;
}

export interface DbSeasoning {
  id: number;
  name: string;
  description: string;
  level: number;
  image: string;
  allergens: string[];
  created_at: string;
  updated_at: string;
}

export interface DbBlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  read_time: string;
  image: string;
  image_alt: string;
  seo_title: string;
  seo_description: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface DbProfile {
  id: string;
  email: string;
  role: "admin" | "seo_editor" | "pending";
  created_at: string;
}

// ---- Blog content block types ----

export type BlogBlock =
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "image"; src: string; alt: string };

export const parseContentBlocks = (raw: string): BlogBlock[] => {
  if (!raw || raw === "[]") return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as BlogBlock[];
  } catch {
    // Legacy plain-text: split on double newline
    return raw
      .split(/\n\n+/)
      .filter(Boolean)
      .map((text) => ({ type: "paragraph", text }));
  }
  return [];
};

export const serializeContentBlocks = (blocks: BlogBlock[]): string => {
  return JSON.stringify(blocks);
};
