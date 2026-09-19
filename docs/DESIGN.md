# Design system

Both halves of the site, the custom pages and Starlight, read from one token
layer. That is what stops them drifting apart.

- `src/styles/tokens.css` is **shared**. Colour (`color.css`), fonts, spacing
  and grid (`layout.css`), radii and motion (`shape.css`), type scale
  (`type-scale.css`). Imported by both halves, so it holds tokens and almost no
  element styling.
- `src/styles/site.css` is **custom pages only**. Reset, prose typography,
  cards, bars. Loaded by `src/layouts/Layout.astro`. Starlight pages never see
  it.
- `src/styles/starlight.css` is **the bridge**. Re-points Starlight's `--sl-*`
  properties at the shared tokens. Passed to Starlight via `customCss`.

## Rules

**Change a colour in `src/styles/color.css` and nowhere else.** The Starlight
grey ramp is derived from `--foreground` and `--background` by `color-mix`, so
it inverts between themes automatically and there is no second palette to keep
in sync.

**Fonts** are self-hosted variable woff2 in `public/fonts/` (DM Sans, Lilex).
No font CDN.

**Theme preference** is stored under the `starlight-theme` localStorage key by
both halves, so a choice made on a post is already applied in the handbook. Do
not rename that key.

**Starlight component overrides** live in `src/components/starlight/` and are
only `SiteTitle`, `PageTitle` (which adds the status badge) and `Footer`. The
high-level layout components (`PageFrame`, `TwoColumnContent`) are deliberately
left stock, because Starlight's own docs warn against overriding them.

**Page maturity** uses one visual scale for two vocabularies. Handbook `status`
is researching, working or settled. Post `stage` is seedling, budding or
evergreen. Mapped in `src/types.ts`, styled in `src/styles/stage.css`.

## Two gotchas worth knowing before you edit

1. **`data-pagefind-body`.** Starlight stamps this on its own pages, and once
   the attribute exists anywhere on a site Pagefind indexes *only* elements
   that carry it. `src/layouts/Layout.astro` puts it on `<main>` for exactly
   this reason. Remove it and every custom page silently drops out of search
   while the handbook keeps working.
2. **Astro collapses whitespace before an inline element.** Prose like
   `in the\n<a>handbook</a>` renders as "in thehandbook". Use an explicit
   `{' '}`.
