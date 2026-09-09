# Debrief — Abstractions and Notes

Scott Richmond's blog + handbook, rebuilt off WordPress onto [Astro](https://astro.build) with [Starlight](https://starlight.astro.build) for the handbook. Deploys to Cloudflare Pages. Domain: `strichnet.com` (unchanged).

The design is adapted from the [My Scholar](https://github.com/mychiffonn/myscholar) Astro theme (Apache-2.0) — see [`NOTICE`](NOTICE) and "Design system" below.

## Structure

- **Blog** (`src/content/blog/`) — narrative field reports, served at `/blog/<slug>`. Never edited after publication (see the one-line test in `src/content/docs/handbook/start-here/what-this-is.md`). The 17 posts migrated from WordPress originally served at the site root; every one of those permalinks now 301s to its `/blog/` URL and `scripts/check-redirects.mjs` enforces that.
- **Handbook** (`src/content/docs/handbook/`) — a Starlight docs site nested one level deep so it serves at `/handbook/*` in the same repo, same build, same search index as the blog. See that folder for the six-section structure and which pages are stubs vs. write-now priority.
- **Projects** (`src/content/projects/`) — tooling and infrastructure work. Cards at `/projects`, detail pages at `/projects/<id>`. See `src/content/projects/README.md` for the frontmatter.
- **Uses** (`src/content/uses.json`) — the `/uses` stack list. Edit the JSON, never the page component.
- **Now** (`src/content/updates/`) — short dated entries; newest three appear on the home page, all of them at `/now`.
- **`public/_redirects`** — Cloudflare Pages path redirects: `/feed/` → `/rss.xml` plus one 301 per legacy post permalink. Host/protocol canonicalization (`www` → bare domain, `http` → `https`) happens in the Cloudflare dashboard instead — see `docs/REDIRECTS.md`.

## Local development

```sh
npm install
npm run dev              # http://localhost:4321
npm run build            # checks redirects, then outputs to dist/
npm run preview          # serve the built output locally
npm run check            # astro check (types)
npm run check:redirects  # legacy permalink guard on its own
```

`npm run build` runs `scripts/check-redirects.mjs` first and fails if any published post's `originalPath` lacks a 301 in `public/_redirects`. That guard exists because a missing redirect is invisible: the new page builds fine and only the twelve-year-old inbound link 404s.

## Design system

Both halves of the site — the custom pages and Starlight — read from one token layer, which is what stops them drifting apart:

- `src/styles/tokens.css` — **shared.** Colour (`color.css`), fonts, spacing/grid (`layout.css`), radii and motion (`shape.css`), type scale (`type-scale.css`). Imported by both halves, so it holds tokens and almost no element styling.
- `src/styles/site.css` — **custom pages only.** Reset, prose typography, cards, bars. Loaded by `src/layouts/Layout.astro`. Starlight pages never see it.
- `src/styles/starlight.css` — **the bridge.** Re-points Starlight's `--sl-*` properties at the shared tokens. Passed to Starlight via `customCss`.

Practical notes:

- **Change a colour in `src/styles/color.css`, nowhere else.** The Starlight grey ramp is derived from `--foreground`/`--background` by `color-mix`, so it inverts between themes automatically and there is no second palette to keep in sync.
- **Fonts** are self-hosted variable woff2 in `public/fonts/` (DM Sans, Lilex). No font CDN.
- **Theme preference** is stored under the `starlight-theme` localStorage key by both halves, so a choice made on a post is already applied in the handbook. Don't rename that key.
- **Starlight component overrides** live in `src/components/starlight/` — only `SiteTitle`, `PageTitle` (adds the status badge) and `Footer`. The high-level layout components (`PageFrame`, `TwoColumnContent`) are deliberately left stock; Starlight's own docs warn against overriding them.
- **Page maturity** uses one visual scale for two vocabularies: handbook `status` (stub/working/settled) and post `stage` (seedling/budding/evergreen), mapped in `src/types.ts` and styled in `src/styles/stage.css`.

### Two gotchas worth knowing before you edit

1. **`data-pagefind-body`.** Starlight stamps this on its own pages, and once the attribute exists anywhere on a site Pagefind indexes *only* elements that carry it. `src/layouts/Layout.astro` puts it on `<main>` for exactly this reason. Remove it and every custom page silently drops out of search while the handbook keeps working.
2. **Astro collapses whitespace before an inline element.** Prose like `in the\n<a>handbook</a>` renders as "in thehandbook". Use an explicit `{' '}`.

## Status

- [x] Astro + Starlight scaffold, blog/handbook routing, Pagefind search covering both sections
- [x] Handbook skeleton seeded (26 pages, mostly `status: stub`)
- [x] All 17 old posts migrated with real content — see `docs/MIGRATION.md`
- [x] Images/attachments from `wp-content/uploads` — all 14 in place under `public/assets/blog/`
- [x] My Scholar design system ported; blog moved to `/blog/*` with 301s; `/projects`, `/uses`, `/now` added
- [ ] Real handbook content (still stubs)
- [ ] Tags on migrated posts — the 17 imported posts have no `tags`, so `/blog/tags` is currently empty
- [ ] Pushed to `github.com/strich/debrief`
- [ ] Connected to Cloudflare Pages
- [ ] Redirect rule + "Always Use HTTPS" configured on the `strichnet.com` zone (DNS is already on Cloudflare) — `docs/REDIRECTS.md`

## Deploying (Cloudflare Pages)

1. Push this repo to GitHub (`github.com/strich/debrief` or similar).
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**, pick the repo.
3. Build settings: framework preset **Astro**, build command `npm run build`, output directory `dist`.
4. Add `strichnet.com` as a custom domain on the Pages project — DNS for the zone is already on Cloudflare, so this is just adding the domain to the project and letting Cloudflare issue the certificate.
5. Follow `docs/REDIRECTS.md` for the host-canonicalization redirect rule and the "Always Use HTTPS" toggle.
