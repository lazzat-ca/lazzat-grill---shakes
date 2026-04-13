-- ============================================================
-- Lazzat Grill & Shakes – Supabase Schema
-- Run this in your Supabase SQL editor (Dashboard > SQL Editor)
-- ============================================================

-- ----------------------------------------------------------------
-- 1. PROFILES  (linked to auth.users, stores role)
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id   UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  role  TEXT NOT NULL DEFAULT 'pending'
    CHECK (role IN ('admin', 'seo_editor', 'pending')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Keep existing projects in sync with the new role model
ALTER TABLE public.profiles
  ALTER COLUMN role SET DEFAULT 'pending';
ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_role_check
  CHECK (role IN ('admin', 'seo_editor', 'pending'));

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
DROP POLICY IF EXISTS "profiles_read_own" ON public.profiles;
CREATE POLICY "profiles_read_own" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Service role can do everything (used by API routes)
-- (service role bypasses RLS automatically)

-- Auto-create profile on new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'pending')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ----------------------------------------------------------------
-- 2. MENU ITEMS
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.menu_items (
  id              BIGSERIAL PRIMARY KEY,
  name            TEXT NOT NULL,
  description     TEXT NOT NULL DEFAULT '',
  price           NUMERIC(10,2),
  image           TEXT NOT NULL DEFAULT '',
  image_alt       TEXT NOT NULL DEFAULT '',
  category        TEXT NOT NULL,
  sub_category    TEXT,
  heat_level      INTEGER NOT NULL DEFAULT 0,
  is_new          BOOLEAN NOT NULL DEFAULT FALSE,
  is_popular      BOOLEAN NOT NULL DEFAULT FALSE,
  sauce_pairings  JSONB NOT NULL DEFAULT '[]',
  side_pairings   JSONB NOT NULL DEFAULT '[]',
  customizations  JSONB NOT NULL DEFAULT '[]',
  allergens       JSONB NOT NULL DEFAULT '[]',
  dietary         JSONB NOT NULL DEFAULT '[]',
  flavors         JSONB NOT NULL DEFAULT '[]',
  textures        JSONB NOT NULL DEFAULT '[]',
  side_type       TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "menu_items_public_read" ON public.menu_items;
CREATE POLICY "menu_items_public_read" ON public.menu_items FOR SELECT USING (TRUE);

-- ----------------------------------------------------------------
-- 3. SAUCES
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.sauces (
  id          BIGSERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  level       INTEGER NOT NULL DEFAULT 0,
  image       TEXT NOT NULL DEFAULT '',
  allergens   JSONB NOT NULL DEFAULT '[]',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.sauces ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "sauces_public_read" ON public.sauces;
CREATE POLICY "sauces_public_read" ON public.sauces FOR SELECT USING (TRUE);

-- ----------------------------------------------------------------
-- 4. SEASONINGS
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.seasonings (
  id          BIGSERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  level       INTEGER NOT NULL DEFAULT 0,
  image       TEXT NOT NULL DEFAULT '',
  allergens   JSONB NOT NULL DEFAULT '[]',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.seasonings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "seasonings_public_read" ON public.seasonings;
CREATE POLICY "seasonings_public_read" ON public.seasonings FOR SELECT USING (TRUE);

-- ----------------------------------------------------------------
-- 5. BLOG POSTS
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id              TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  title           TEXT NOT NULL DEFAULT '',
  excerpt         TEXT NOT NULL DEFAULT '',
  -- content is stored as JSON blocks string: [{type,text},...] or plain text
  content         TEXT NOT NULL DEFAULT '[]',
  author          TEXT NOT NULL DEFAULT '',
  date            TEXT NOT NULL DEFAULT '',
  category        TEXT NOT NULL DEFAULT '',
  read_time       TEXT NOT NULL DEFAULT '',
  image           TEXT NOT NULL DEFAULT '',
  image_alt       TEXT NOT NULL DEFAULT '',
  seo_title       TEXT NOT NULL DEFAULT '',
  seo_description TEXT NOT NULL DEFAULT '',
  published       BOOLEAN NOT NULL DEFAULT FALSE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
-- Public can only read published posts
DROP POLICY IF EXISTS "blog_posts_public_read" ON public.blog_posts;
CREATE POLICY "blog_posts_public_read" ON public.blog_posts
  FOR SELECT USING (published = TRUE);

-- ----------------------------------------------------------------
-- 6. LOCATIONS
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.locations (
  id             BIGSERIAL PRIMARY KEY,
  name           TEXT NOT NULL,
  address        TEXT NOT NULL,
  lat            DOUBLE PRECISION NOT NULL,
  lng            DOUBLE PRECISION NOT NULL,
  phone          TEXT NOT NULL DEFAULT '',
  weekday_hours  TEXT NOT NULL DEFAULT '',
  weekend_hours  TEXT NOT NULL DEFAULT '',
  sunday_hours   TEXT NOT NULL DEFAULT '',
  amenities      JSONB NOT NULL DEFAULT '[]',
  is_active      BOOLEAN NOT NULL DEFAULT TRUE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "locations_public_read" ON public.locations;
CREATE POLICY "locations_public_read" ON public.locations
  FOR SELECT USING (is_active = TRUE);

-- ----------------------------------------------------------------
-- 7. STORAGE BUCKET for uploaded images
-- ----------------------------------------------------------------
-- Run this in Supabase Storage settings or via dashboard:
-- Create a bucket named "lazzat-images" (public)
-- Then add this policy via SQL:

INSERT INTO storage.buckets (id, name, public)
VALUES ('lazzat-images', 'lazzat-images', TRUE)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload
DROP POLICY IF EXISTS "authenticated_upload" ON storage.objects;
CREATE POLICY "authenticated_upload" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'lazzat-images');

-- Allow public read
DROP POLICY IF EXISTS "public_read_images" ON storage.objects;
CREATE POLICY "public_read_images" ON storage.objects
  FOR SELECT USING (bucket_id = 'lazzat-images');

-- Allow authenticated users to delete their uploads
DROP POLICY IF EXISTS "authenticated_delete" ON storage.objects;
CREATE POLICY "authenticated_delete" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'lazzat-images');

-- ----------------------------------------------------------------
-- 8. UPDATE TIMESTAMPS trigger (reusable)
-- ----------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS menu_items_updated_at ON public.menu_items;
DROP TRIGGER IF EXISTS sauces_updated_at ON public.sauces;
DROP TRIGGER IF EXISTS seasonings_updated_at ON public.seasonings;
DROP TRIGGER IF EXISTS blog_posts_updated_at ON public.blog_posts;
DROP TRIGGER IF EXISTS locations_updated_at ON public.locations;

CREATE TRIGGER menu_items_updated_at  BEFORE UPDATE ON public.menu_items  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at();
CREATE TRIGGER sauces_updated_at      BEFORE UPDATE ON public.sauces      FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at();
CREATE TRIGGER seasonings_updated_at  BEFORE UPDATE ON public.seasonings  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at();
CREATE TRIGGER blog_posts_updated_at  BEFORE UPDATE ON public.blog_posts  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at();
CREATE TRIGGER locations_updated_at   BEFORE UPDATE ON public.locations   FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at();

-- ----------------------------------------------------------------
-- AFTER RUNNING: promote your first admin user
-- Replace <YOUR_USER_UUID> with the UUID from auth.users
-- ----------------------------------------------------------------
-- UPDATE public.profiles SET role = 'admin' WHERE id = '<YOUR_USER_UUID>';
