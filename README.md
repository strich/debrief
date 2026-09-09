# Debrief — Abstractions and Notes

Scott Richmond's blog + handbook, rebuilt off WordPress onto [Astro](https://astro.build) with [Starlight](https://starlight.astro.build) for the handbook. Deploys to Cloudflare Pages. Domain: `strichnet.com` (unchanged).

## Structure

- **Blog** (`src/content/blog/`) — narrative field reports, served at the site root (`/some-post-slug/`) to match the old WordPress "post name" permalinks. Never edited after publication (see the one-line test in `src/content/docs/handbook/start-here/what-this-is.md`).
- **Handbook** (`src/content/docs/handbook/`) — a Starlight docs site nested one level deep so it serves at `/handbook/*` in the same repo, same build, same search index as the blog. See that folder for the six-section structure and which pages are stubs vs. write-now priority.
- **`public/_redirects`** — Cloudflare Pages path redirects (old `/feed/` → new `/rss.xml`, plus any per-post redirects once the WordPress migration confirms exact old permalinks). See `docs/REDIRECTS.md` for what this can and can't do — host/protocol canonicalization (`www` → bare domain, `http` → `https`) happens in the Cloudflare dashboard instead.

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
- [x] 17 old posts seeded as **draft placeholders** with best-guess slugs — see `docs/MIGRATION.md`
- [ ] WordPress export processed → real post content + confirmed redirect map
- [ ] Pushed to `github.com/strich/debrief`
- [ ] Connected to Cloudflare Pages
- [ ] `strichnet.com` DNS pointed at Cloudflare + redirect rules configured (`docs/REDIRECTS.md`)

## Deploying (Cloudflare Pages)

1. Push this repo to GitHub (`github.com/strich/debrief` or similar).
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**, pick the repo.
3. Build settings: framework preset **Astro**, build command `npm run build`, output directory `dist`.
4. Add `strichnet.com` as a custom domain on the Pages project once DNS for the zone is on Cloudflare.
5. Follow `docs/REDIRECTS.md` for the host-canonicalization redirect rule and the "Always Use HTTPS" toggle.
