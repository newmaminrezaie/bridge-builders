

## Plan: Update Contact Details Across the Site

Update hardcoded phone, WhatsApp, and Telegram details in all files, plus insert the values into the `site_settings` table.

### Changes

**1. `src/components/FloatingButtons.tsx`**
- Telegram href → `https://t.me/maminre`
- WhatsApp href → `https://wa.me/qr/ERDSPOB6INRHP1`

**2. `src/pages/Contact.tsx`**
- WhatsApp link → `https://wa.me/qr/ERDSPOB6INRHP1`, display `۰۹۱۵۰۶۱۶۷۸۸`
- Telegram link → `https://t.me/maminre`, display `@maminre`
- Phone display → `۰۹۱۵۰۶۱۶۷۸۸`

**3. `src/components/Footer.tsx`**
- Update WhatsApp number display and any links to match new details

**4. Supabase `site_settings` table** (data insert, not migration)
- Insert rows for `whatsapp_number` = `09150616788`, `telegram_username` = `@maminre`, `phone_number` = `09150616788`

