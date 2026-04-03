

## Plan: Replace PNG Logo with Custom SVG Logo

### What
Remove the uploaded PNG logo and create a new inline SVG logo for IntlBridges (intlbridges.ir) — a brand about bridging Iranian businesses to international markets. The SVG will feature a stylized globe with a bridge arc, using the site's primary blue (`#1a6abf` / `hsl(215, 90%, 40%)`) and accent teal colors.

### Design Concept
A minimalist globe (circle + latitude/longitude lines) with a bold bridge arc crossing it, paired with "IntlBridges" text. Clean, professional, scalable.

### Changes

**1. Create `src/components/Logo.tsx`**
- Inline SVG component: globe circle, meridian ellipse, two latitude lines, a prominent bridge arc in accent color
- "IntlBridges" text next to the icon
- Accept optional `className` and `showText` props for flexibility (navbar vs favicon)

**2. Edit `src/components/Navbar.tsx`**
- Remove `import logo from '@/assets/logo.png'`
- Replace `<img>` with `<Logo />` component

**3. Edit `src/components/Footer.tsx`**
- Replace the hardcoded "IB" div + "IntlBridges" span with `<Logo />` component

**4. Update `public/favicon.svg`**
- Use the same SVG icon (without text) as the favicon, matching the new design

