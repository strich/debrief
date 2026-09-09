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
- **Per-post redirects — all 17 of them, and they are now load-bearing.** This changed with the theme upgrade. Posts originally served at the site root (`/post-name/`) precisely so they'd match the old WordPress permalinks with no redirect at all. They now serve at `/blog/<slug>`, which is what makes the blog index, tag pages and breadcrumbs coherent — so every one of those 17 root permalinks has a 301 in `public/_redirects`. Twelve years of inbound links point at them.

  Do **not** collapse these into a splat (`/* /blog/:splat`). That would also swallow `/handbook/*`, `/projects/*`, `/uses` and `/now`.

  `scripts/check-redirects.mjs` asserts, for every published post carrying an `originalPath`, that a rule exists, that it points at that post's real `/blog/` URL, and that it's a 301 rather than a 302. It runs as the first step of `npm run build`, so a post added with a legacy URL and no redirect fails the build instead of shipping a silent 404. Run it alone with `npm run check:redirects`.

## Verifying before cutover

Before pointing DNS at Cloudflare Pages for real:

- [ ] `npm run check:redirects` passes (it asserts all 17 legacy permalinks resolve to their `/blog/` URLs with a 301).
- [ ] Spot-check a few in the deployed preview with `curl -I`, since the guard checks the file's contents but not Cloudflare's interpretation of it.
- [ ] `/feed/` redirects to `/rss.xml` and the resulting feed validates.
- [ ] `http://www.strichnet.com/<any-old-path>` redirects to `https://strichnet.com/<same-path>` in one hop (test with `curl -I`).
- [ ] The bare-domain 429 is gone once DNS/proxy moves to Cloudflare (it was almost certainly a symptom of the old host, not something that follows the domain).
