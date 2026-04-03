

## Plan: Admin Panel Improvements — External Links + Blog Categories

### 1. Add "View Site" and "View Blog" links to admin sidebar

**File: `src/pages/admin/AdminLayout.tsx`**
- Add two external links at the bottom of the sidebar nav (above logout), using `ExternalLink` icon from lucide
  - "مشاهده سایت" → `/` (opens in new tab)
  - "مشاهده بلاگ" → `/blog` (opens in new tab)
- Also add these to the mobile nav strip

### 2. Create `blog_categories` database table

New migration to create a `blog_categories` table:

```text
blog_categories
├── id (uuid, PK)
├── name (text, NOT NULL) — Persian display name
├── slug (text, NOT NULL, UNIQUE) — URL-friendly slug
├── description (text) — for SEO meta description
├── meta_title (text) — custom SEO title
├── meta_keywords (text) — SEO keywords
├── sort_order (integer, default 0)
├── created_at (timestamptz)
```

RLS: public read, admin-only write. Update `blog_articles.category` to reference the slug from this table (no FK constraint, keep flexible).

### 3. Create Admin Categories page

**New file: `src/pages/admin/AdminCategories.tsx`**
- CRUD interface for blog categories (similar pattern to AdminBlog)
- Fields: name, slug (auto-generated from name), description, meta_title, meta_keywords, sort_order
- Table view with edit/delete actions
- Dialog form for add/edit

### 4. Wire up routing and navigation

- **`src/App.tsx`**: Add route `/admin/categories` → `AdminCategories`
- **`src/pages/admin/AdminLayout.tsx`**: Add "دسته‌بندی‌ها" link with `FolderOpen` icon to sidebar nav

### 5. Update AdminBlog to use dynamic categories

- **`src/pages/admin/AdminBlog.tsx`**: Fetch categories from `blog_categories` table instead of hardcoded `blogCategories` from `persian.ts`
- Category dropdown in article form uses DB categories

### 6. Update public Blog page to use dynamic categories

- **`src/pages/Blog.tsx`**: Fetch categories from `blog_categories` table for filter buttons instead of hardcoded list
- **`src/pages/BlogArticle.tsx`**: Use dynamic category label from DB

### 7. Seed existing categories

Insert the 5 existing hardcoded categories (payment, ecommerce, shipping, digital, legal) into the new table so no data is lost.

