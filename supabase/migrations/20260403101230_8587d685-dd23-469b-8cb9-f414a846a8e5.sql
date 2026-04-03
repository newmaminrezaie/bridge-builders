
CREATE TABLE public.blog_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  meta_title text,
  meta_keywords text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read categories" ON public.blog_categories
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Admins can manage categories" ON public.blog_categories
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

INSERT INTO public.blog_categories (name, slug, sort_order) VALUES
  ('پرداخت', 'payment', 1),
  ('تجارت الکترونیک', 'ecommerce', 2),
  ('حمل‌ونقل', 'shipping', 3),
  ('دیجیتال', 'digital', 4),
  ('قانونی', 'legal', 5);
