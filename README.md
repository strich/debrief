# Debrief — Abstractions and Notes

Scott Richmond's blog + handbook, rebuilt off WordPress onto [Astro](https://astro.build) with [Starlight](https://starlight.astro.build) for the handbook. Deploys to Cloudflare Pages. Domain: `strichnet.com` (unchanged).

## Structure

- **Blog** (`src/content/blog/`) — narrative field reports, served at the site root (`/some-post-slug/`) to match the old WordPress "post name" permalinks. Never edited after publication (see the one-line test in `src/content/docs/handbook/start-here/what-this-is.md`).
- **Handbook** (`src/content/docs/handbook/`) — a Starlight docs site nested one level deep so it serves at `/handbook/*` in the same repo, same build, same search index as the blog. See that folder for the six-section structure and which pages are stubs vs. write-now priority.
- **`public/_redirects`** — Cloudflare Pages path redirects. Just `/feed/` → `/rss.xml` — every old post permalink matched its new slug exactly, confirmed against the real WordPress export, so no per-post redirects were needed. See `docs/REDIRECTS.md` for what this file can and can't do — host/protocol canonicalization (`www` → bare domain, `http` → `https`) happens in the Cloudflare dashboard instead.

## Local development

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
npm run preview  # serve the built output locally
```

## Status

- [x] Astro + Starlight scaffold, blog/handbook routing, Pagefind search covering both sections
- [x] Handbook skeleton seeded (26 pages, mostly `status: stub`)
- [x] All 17 old posts migrated with real content — zero redirects needed, every slug matched — see `docs/MIGRATION.md`
- [x] Images/attachments from `wp-content/uploads` — all 14 in place under `public/assets/blog/`
- [ ] Pushed to `github.com/strich/debrief`
- [ ] Connected to Cloudflare Pages
- [ ] Redirect rule + "Always Use HTTPS" configured on the `strichnet.com` zone (DNS is already on Cloudflare) — `docs/REDIRECTS.md`

## Deploying (Cloudflare Pages)

1. Push this repo to GitHub (`github.com/strich/debrief` or similar).
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**, pick the repo.
3. Build settings: framework preset **Astro**, build command `npm run build`, output directory `dist`.
4. Add `strichnet.com` as a custom domain on the Pages project — DNS for the zone is already on Cloudflare, so this is just adding the domain to the project and letting Cloudflare issue the certificate.
5. Follow `docs/REDIRECTS.md` for the host-canonicalization redirect rule and the "Always Use HTTPS" toggle.
