

## Plan: Update `public/_headers`

Add or create the file `public/_headers` with a rule to set `X-Robots-Tag: noindex, nofollow` for the Cloudflare Pages subdomain.

### File: `public/_headers`

Write the complete file content:

```
https://bridge-builders.pages.dev/*
  X-Robots-Tag: noindex, nofollow
```

Single file change, no other modifications.

