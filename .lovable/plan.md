

## Plan: Add SEO/Meta Settings to Admin Panel

### What We're Building
A new "SEO و متا" (SEO & Meta) card in the admin settings page that lets you edit the site's default title, description, OG image URL, and meta keywords — all stored in the `site_settings` table and consumed by the SEO component.

### Changes

**1. Add SEO setting keys to `AdminSettings.tsx`**
- Add a second card section titled "تنظیمات سئو و متا" with these fields:
  - `site_name` — نام سایت (e.g. اینتل‌بریجز)
  - `site_tagline` — شعار سایت (the part after "—" in the title)
  - `site_description` — توضیحات پیش‌فرض سایت
  - `og_image_url` — تصویر پیش‌فرض اشتراک‌گذاری (OG Image URL)
  - `meta_keywords` — کلمات کلیدی
- Use `Textarea` for description, `Input` for the rest
- Save logic already handles any keys via the upsert loop — just extend the `settingKeys` array with a `group` field to render two separate cards

**2. Update `SEO.tsx` to read from `site_settings`**
- Create a `useSiteSettings` hook (in `src/hooks/use-site-settings.ts`) that fetches and caches the SEO-related keys from `site_settings` on mount
- In `SEO.tsx`, replace hardcoded `SITE_NAME`, `DEFAULT_DESC`, and `DEFAULT_OG` with values from the hook (falling back to current hardcoded defaults if not set)

**3. New file: `src/hooks/use-site-settings.ts`**
- Fetches all rows from `site_settings` once, stores in state
- Exports a `useSiteSettings()` hook returning a `Record<string, string>`
- Uses a simple module-level cache so multiple components don't re-fetch

### Files to Create/Modify
| File | Action |
|------|--------|
| `src/hooks/use-site-settings.ts` | Create — shared hook for site settings |
| `src/pages/admin/AdminSettings.tsx` | Modify — add SEO fields card |
| `src/components/SEO.tsx` | Modify — use dynamic values from hook |

No database changes needed — the existing `site_settings` table already supports arbitrary key-value pairs.

