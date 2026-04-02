

## Plan: Remove Lovable Branding & Add Custom Favicon

### What we're doing
1. **Hide the Lovable badge** using the `publish_settings--set_badge_visibility` tool
2. **Generate a custom favicon** — an SVG globe/bridge icon relevant to IntlBridges (international bridges theme), and add it to `index.html`

### Technical steps

**Step 1: Hide Lovable badge**
- Call `set_badge_visibility(hide_badge: true)`

**Step 2: Create favicon**
- Create `public/favicon.svg` — a simple globe/bridge SVG icon in brand colors
- Update `index.html` to add `<link rel="icon" href="/favicon.svg" type="image/svg+xml">`

**Step 3: Clean up meta tags**
- No Lovable-related meta tags found in `index.html` — nothing to remove there
- The `lovable-tagger` in `vite.config.ts` only runs in development mode, so it won't affect production builds — no change needed

