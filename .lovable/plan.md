

## Plan: Add Tawk.to Live Chat Widget with 5-Second Delay

### What
Add the Tawk.to live chat widget to all pages, loading it after a 5-second delay.

### How

**New file: `src/components/TawkChat.tsx`**
- Create a component that uses `useEffect` to inject the Tawk.to script after a 5-second `setTimeout`
- Uses the provided embed URL: `https://embed.tawk.to/69cf967fd7942e1c3007d33d/1jl9e7ovh`

**Edit: `src/components/Layout.tsx`**
- Import and render `<TawkChat />` inside the Layout so it appears on all pages

