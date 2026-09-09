# Migrating the WordPress content

## Status: text migrated, images pending

All 17 published posts (2013–2022) are live in `src/content/blog/` with real content, `draft: false`, and the exact original permalink recorded in `originalPath`. Migrated with `scripts/migrate_wordpress.py <export.xml>` from the 9 Sep 2026 WXR export.

**Every slug matched the pre-migration placeholder guess exactly** — the old permalinks were flat `/post-name/` with no date prefix, same as the new routing here. That means **zero per-post redirects are needed**; `public/_redirects` only has the `/feed/` → `/rss.xml` line. If a future re-export ever produces a different slug for an existing post, re-run the script and check its output for a mismatch warning.

## What's NOT migrated, and why

- **Images and other attachments.** 14 references across 9 posts point at `wp-content/uploads/...` files (screenshots, diagrams, a couple of PDFs, one zip). The migration script already rewrote every post's Markdown to point at `/assets/blog/<slug>/<filename>` — see `docs/MISSING_ASSETS.md` for the full list. The files themselves couldn't be downloaded from here: `strichnet.com` isn't reachable through this environment's network allowlist, from either the cloud workspace or the connected device (both got blocked at the proxy, not from the site itself). **To finish this:** grab `wp-content/uploads/` from the site (hosting file manager or FTP is easiest — no need for a fresh WordPress export, just the files) and drop each one at the path `docs/MISSING_ASSETS.md` lists. The posts will render fully with no further edits once the files exist there.
- **7 never-published drafts** sitting in the export are excluded entirely, on purpose — they have no slug and no public URL (`wp-content` links like `/?p=145`), so there's no old link to preserve and nothing was ever public to reproduce. Titles, for reference, in case any are worth reviving deliberately:
  - "Perfect, Fast & Compact Deserialization of Unknown Types" (2015-09-29)
  - "Post-Kickstarter Review: Keeping The Funding Channel Open" (2013-07-29)
  - "Configuring a LAN-to-LAN IPsec VPN with Overlapping Networks" (2014-01-16)
  - "Using NAT Traversal to Locally Host Servers" (2014-02-05)
  - "Compiling a standalone C# application in Windows" (2014-06-11)
  - "How we reduced our texture memory footprint by 50% with Unity 5.1" (2015-09-29) — this one in particular reads like handbook material (performance, Unity-specific) rather than blog material, if it's ever finished.
  - One untitled draft (2015-08-15), empty title in the export — not migrated, not listed above as an idea.

## Re-running the migration

`python3 scripts/migrate_wordpress.py path/to/export.xml` — idempotent, overwrites the 17 files in `src/content/blog/` by slug. Safe to re-run against a fresher export later; it will only touch posts whose `wp:post_type` is `post` and `wp:status` is `publish`.

## Confidentiality note

Per the relaunch plan, all 17 posts are personal/technical material already classified "usable as-is" — none touch Brightrock, Skeleton Crew, or colleague-attributed material. That classification only matters for *new* posts and handbook pages going forward, not this back-catalogue.
