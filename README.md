# Debrief

Scott Richmond's blog and handbook at [strichnet.com](https://strichnet.com).

The blog is dated field reports, written once and not edited afterwards. The
handbook is where the parts that turn out to be generally true get written up
and maintained. Both are about running a small game studio's infrastructure and
putting AI to work inside it.

## Stack

[Astro](https://astro.build) with [Starlight](https://starlight.astro.build)
for the handbook, one build and one Pagefind search index across both. Static
output, deployed to Cloudflare Pages. No CSS framework and no font CDN.

Design adapted from the [My Scholar](https://github.com/mychiffonn/myscholar)
Astro theme (Apache-2.0). See [`NOTICE`](NOTICE).

## Local development

```sh
npm install
npm run dev              # http://localhost:4321
npm run build            # checks redirects, then outputs to dist/
npm run preview          # serve the built output locally
npm run check            # astro check
npm run check:redirects  # legacy permalink guard on its own
```

## Content

All content is markdown and JSON under `src/content/`, with schemas in
`src/content.config.ts`.

| Path | What it is | Serves at |
| --- | --- | --- |
| `blog/` | Field reports | `/blog/<slug>` |
| `docs/handbook/` | The handbook, a Starlight docs site nested one level deep | `/handbook/*` |
| `projects/` | Tooling work, frontmatter documented in its own `README.md` | `/projects/<id>` |
| `updates/` | Short dated entries, newest three on the home page | `/now` |
| `uses.json` | The stack list. Edit the JSON, never the page component | `/uses` |

## Redirects

The 17 posts migrated from WordPress originally served at the site root. Every
one of those permalinks now 301s to its `/blog/` URL from
`public/_redirects`, and `npm run build` fails if a published post's
`originalPath` has no rule. That guard exists because a missing redirect is
invisible: the new page builds fine and only the twelve-year-old inbound link
404s.

Host and protocol canonicalization (`www` to bare domain, `http` to `https`)
happens in the Cloudflare dashboard rather than in this repo.

## Also in this repo

- [`docs/DESIGN.md`](docs/DESIGN.md) is the token layer, the Starlight bridge
  and two gotchas that will cost you an afternoon.
- [`docs/REDIRECTS.md`](docs/REDIRECTS.md) is the full redirect and DNS setup.
- [`docs/MIGRATION.md`](docs/MIGRATION.md) is how the WordPress export was
  converted.
