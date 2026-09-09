# Redirects and canonicalization

Goal: every URL that currently works on the old WordPress site keeps working after the move, with no exceptions. There are two separate problems, handled in two separate places.

## 1. Host/protocol canonicalization — Cloudflare dashboard, not this repo

The old site self-references `http://www.strichnet.com` throughout its feed and sitemap, and the bare domain `strichnet.com` currently 429s. That has to be cleaned up regardless of the rebuild. `public/_redirects` in this repo **cannot** fix it — Cloudflare Pages' `_redirects` file only rewrites paths on whatever hostname is already serving the request; it has no way to redirect a *different* hostname (`www.strichnet.com`) or a different protocol (`http://`) to this project.

Do this once, in the Cloudflare dashboard for the `strichnet.com` zone, after DNS points at Cloudflare:

1. **SSL/TLS → Edge Certificates → "Always Use HTTPS"**: on. Kills every `http://` link in one step.
2. **Rules → Redirect Rules → create rule**:
   - When incoming hostname equals `www.strichnet.com`
   - Then: Dynamic redirect → `concat("https://strichnet.com", http.request.uri.path)`, status 301, preserve query string.

Cloudflare's free tier includes 10 Redirect Rules — this uses one.

## 2. Path-level redirects — `public/_redirects` in this repo

Once host/protocol are canonical, everything left is a same-host path problem, which `_redirects` handles natively on Cloudflare Pages. Two categories:

- **`/feed/` → `/rss.xml`** — already in the file. Astro's RSS integration can't cheaply produce a literal `/feed/` endpoint, so the old feed URL 301s to the new one instead of being replicated byte-for-byte. Feed readers follow redirects automatically; nobody loses the subscription.
- **Per-post redirects** — only needed for a post whose exact old permalink doesn't match its new slug. The migration script (`scripts/migrate-wordpress.mjs`, written once the WordPress export is available — see `docs/MIGRATION.md`) sets each post's `originalPath` from the export and its file slug from the same source, so in the normal case they're identical and **no redirect is needed at all**. The script prints a warning for any post where they differ, and that's when a line gets added below the marker in `public/_redirects`.

## Verifying before cutover

Before pointing DNS at Cloudflare Pages for real:

- [ ] Every one of the 17 old post URLs (from the WordPress export's `<link>` values) either matches a live route on the new site, or has a corresponding line in `public/_redirects`.
- [ ] `/feed/` redirects to `/rss.xml` and the resulting feed validates.
- [ ] `http://www.strichnet.com/<any-old-path>` redirects to `https://strichnet.com/<same-path>` in one hop (test with `curl -I`).
- [ ] The bare-domain 429 is gone once DNS/proxy moves to Cloudflare (it was almost certainly a symptom of the old host, not something that follows the domain).
