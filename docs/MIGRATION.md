# Migrating the WordPress content

## Status

The 17 posts from the old site (2013–2022) exist here as **draft placeholders** in `src/content/blog/`, seeded from titles and dates only (`scripts/seed-blog-placeholders.mjs`). Their slugs and `originalPath` values are **best guesses** from the titles and are not yet confirmed against the real permalinks. Every placeholder has `draft: true`, so none of them appear on the live site, in the post index, or in the RSS feed until they're replaced with real content and flipped to `draft: false`. They *are* individually viewable at their URL for previewing, since the dynamic route doesn't filter drafts.

## What's needed to finish this

A WordPress "All Content" export (WP Admin → Tools → Export on strichnet.com) — a single XML file containing, for every post: the exact permalink (`<link>`), the full body (`<content:encoded>`), the publish date, and any embedded/attached image references.

## Once the export is in hand

1. Drop the XML file into this repo (e.g. `wordpress-export.xml`, gitignored — it's a working input, not a build artifact).
2. Run the migration script (not yet written — build it against the real export's structure rather than guessing at WordPress's export schema in advance): it should, per post —
   - Parse the exact `<link>` and derive the permalink path.
   - Convert `<content:encoded>` HTML to Markdown (e.g. via `turndown`).
   - Write `src/content/blog/<slug>.md` with `title`, `pubDate`, `originalPath` set from the real permalink, and `draft: false`.
   - Compare the derived slug against the placeholder already sitting in `src/content/blog/` (same title) and warn if they differ — that's the signal a redirect is needed (see `docs/REDIRECTS.md`).
   - Pull any images out of the export's attachment URLs (`wp-content/uploads/...`) into `src/assets/blog/<slug>/` and rewrite `<img>` references to point at the local copies, so nothing depends on the old host staying up.
3. Delete the placeholder files the script replaces; leave `scripts/seed-blog-placeholders.mjs` and this doc for the record, or delete both once migration is confirmed complete.
4. Rebuild (`npm run build`) and spot-check a few posts, especially the two feeding the handbook's Git pages (`tuning-git-for-large-binary-repositories`, `migrating-your-project-to-git-lfs`) — those need to read cleanly since the handbook pages that port from them link back.

## Confidentiality note

Per the relaunch plan, all 17 existing posts are personal/technical material already classified "usable as-is" — none of them touch Brightrock, Skeleton Crew, or colleague-attributed material. No review needed on the back-catalogue itself; that classification only matters for *new* posts and handbook pages going forward.
