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

