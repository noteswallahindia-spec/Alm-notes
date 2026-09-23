-- ==========================================================================
-- NOTES WALLAH — COMPLETE DATABASE SCHEMA & RLS POLICIES FOR ADMIN PANEL
-- ==========================================================================

-- 1. Profiles Table (Ensure is_admin column exists)
ALTER TABLE IF EXISTS public.profiles 
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;

-- 2. Products Table (Shop Manager)
CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'books',
  description TEXT,
  image_url TEXT,
  flipkart_url TEXT,
  amazon_url TEXT,
  meesho_url TEXT,
  other_store_name TEXT,
  other_store_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_pinned BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Chapters Table (Notes & Ebooks Manager)
CREATE TABLE IF NOT EXISTS public.chapters (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  class TEXT NOT NULL DEFAULT 'Class 10',
  stream TEXT,
  subject TEXT NOT NULL,
  chapter_no INT NOT NULL DEFAULT 1,
  title TEXT NOT NULL,
  ebook_url TEXT,
  pro_notes_url TEXT,
  pro_notes_text TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Tests Table (Test Manager)
CREATE TABLE IF NOT EXISTS public.tests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  class TEXT NOT NULL DEFAULT 'Class 10',
  stream TEXT,
  subject TEXT NOT NULL,
  title TEXT NOT NULL,
  duration_min INT DEFAULT 15,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Questions Table (MCQ Test Questions)
CREATE TABLE IF NOT EXISTS public.questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  test_id UUID REFERENCES public.tests(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT,
  option_d TEXT,
  correct_option TEXT NOT NULL CHECK (correct_option IN ('A', 'B', 'C', 'D')),
  sort_order INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================================================

-- Enable RLS on all tables
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current authenticated user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND is_admin = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Products: Everyone can read active products, only admins can insert/update/delete
CREATE POLICY "Public can view active products" 
ON public.products FOR SELECT USING (is_active = true OR public.is_admin());

CREATE POLICY "Admins can insert products" 
ON public.products FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update products" 
ON public.products FOR UPDATE USING (public.is_admin());

CREATE POLICY "Admins can delete products" 
ON public.products FOR DELETE USING (public.is_admin());

-- Chapters: Everyone can view active chapters, only admins can insert/update/delete
CREATE POLICY "Public can view active chapters" 
ON public.chapters FOR SELECT USING (is_active = true OR public.is_admin());

CREATE POLICY "Admins can insert chapters" 
ON public.chapters FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update chapters" 
ON public.chapters FOR UPDATE USING (public.is_admin());

CREATE POLICY "Admins can delete chapters" 
ON public.chapters FOR DELETE USING (public.is_admin());

-- Tests: Everyone can view active tests, only admins can insert/update/delete
CREATE POLICY "Public can view active tests" 
ON public.tests FOR SELECT USING (is_active = true OR public.is_admin());

CREATE POLICY "Admins can insert tests" 
ON public.tests FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update tests" 
ON public.tests FOR UPDATE USING (public.is_admin());

CREATE POLICY "Admins can delete tests" 
ON public.tests FOR DELETE USING (public.is_admin());

-- Questions: Everyone can read questions for active tests, only admins can manage
CREATE POLICY "Public can view questions" 
ON public.questions FOR SELECT USING (true);

CREATE POLICY "Admins can insert questions" 
ON public.questions FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update questions" 
ON public.questions FOR UPDATE USING (public.is_admin());

CREATE POLICY "Admins can delete questions" 
ON public.questions FOR DELETE USING (public.is_admin());

-- ==========================================================================
-- STORAGE BUCKETS CONFIGURATION
-- Buckets: 'shop' and 'notes'
-- ==========================================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('shop', 'shop', true)
ON CONFLICT (id) DO UPDATE SET public = true;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('notes', 'notes', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage policies for 'shop' bucket
CREATE POLICY "Public read shop bucket" 
ON storage.objects FOR SELECT USING (bucket_id = 'shop');

CREATE POLICY "Admins upload to shop bucket" 
ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'shop' AND public.is_admin());

-- Storage policies for 'notes' bucket
CREATE POLICY "Public read notes bucket" 
ON storage.objects FOR SELECT USING (bucket_id = 'notes');

CREATE POLICY "Admins upload to notes bucket" 
ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'notes' AND public.is_admin());

-- ==========================================================================
-- SHOP BANNERS & MULTI-IMAGE PRODUCTS
-- ==========================================================================

-- Table: shop_banners
CREATE TABLE IF NOT EXISTS public.shop_banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  title TEXT,
  subtitle TEXT,
  link_url TEXT,
  target_url TEXT,
  show_date DATE,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.shop_banners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public view active shop banners"
ON public.shop_banners FOR SELECT USING (is_active = true OR public.is_admin());

CREATE POLICY "Admins insert shop banners"
ON public.shop_banners FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "Admins update shop banners"
ON public.shop_banners FOR UPDATE USING (public.is_admin());

CREATE POLICY "Admins delete shop banners"
ON public.shop_banners FOR DELETE USING (public.is_admin());

-- Add images column to products if not exists
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]'::jsonb;

-- Storage buckets for shop-banners and products
INSERT INTO storage.buckets (id, name, public)
VALUES ('shop-banners', 'shop-banners', true)
ON CONFLICT (id) DO UPDATE SET public = true;

INSERT INTO storage.buckets (id, name, public)
VALUES ('products', 'products', true)
ON CONFLICT (id) DO UPDATE SET public = true;

CREATE POLICY "Public read shop-banners bucket"
ON storage.objects FOR SELECT USING (bucket_id = 'shop-banners');

CREATE POLICY "Admins upload to shop-banners bucket"
ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'shop-banners' AND public.is_admin());

CREATE POLICY "Public read products bucket"
ON storage.objects FOR SELECT USING (bucket_id = 'products');

CREATE POLICY "Admins upload to products bucket"
ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'products' AND public.is_admin());

-- ==========================================================================
-- GUEST ACCOUNTS COUNTER & RPC (ANONYMOUS TOTAL ONLY)
-- Guest personal/progress data is NEVER written to Supabase profiles or any user table.
-- ==========================================================================

CREATE TABLE IF NOT EXISTS public.app_analytics (
  id TEXT PRIMARY KEY,
  counter_value BIGINT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed guest_accounts counter row
INSERT INTO public.app_analytics (id, counter_value)
VALUES ('guest_accounts', 0)
ON CONFLICT (id) DO NOTHING;

ALTER TABLE public.app_analytics ENABLE ROW LEVEL SECURITY;

-- Allow anon and authenticated users to read the analytics counter
CREATE POLICY "Public read app_analytics"
ON public.app_analytics FOR SELECT USING (true);

-- Allow admins to update analytics if needed
CREATE POLICY "Admins update app_analytics"
ON public.app_analytics FOR ALL USING (public.is_admin());

-- RPC function: increment_guest_count
-- Called once per device when a student taps "Continue as Guest".
-- Purely anonymous counter increment.
CREATE OR REPLACE FUNCTION public.increment_guest_count()
RETURNS BIGINT AS $$
DECLARE
  new_count BIGINT;
BEGIN
  INSERT INTO public.app_analytics (id, counter_value, updated_at)
  VALUES ('guest_accounts', 1, timezone('utc'::text, now()))
  ON CONFLICT (id) DO UPDATE
  SET counter_value = public.app_analytics.counter_value + 1,
      updated_at = timezone('utc'::text, now())
  RETURNING counter_value INTO new_count;

  RETURN new_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execution permissions to anon and authenticated roles
GRANT EXECUTE ON FUNCTION public.increment_guest_count() TO anon, authenticated;

