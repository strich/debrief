# Migrating the WordPress content

## Status: done — text and images both migrated

All 17 published posts (2013-2022) are live in `src/content/blog/` with real content, `draft: false`, and the exact original permalink recorded in `originalPath`. Migrated with `scripts/migrate_wordpress.py <export.xml>` from the 9 Sep 2026 WXR export.

**Every slug matched the pre-migration placeholder guess exactly** - the old permalinks were flat `/post-name/` with no date prefix, same as the new routing here. That means **zero per-post redirects are needed**; `public/_redirects` only has the `/feed/` -> `/rss.xml` line. If a future re-export ever produces a different slug for an existing post, re-run the script and check its output for a mismatch warning.

**Images.** The 14 asset references across 9 posts are now at `public/assets/blog/<slug>/<filename>`, copied from a manual `wp-content/uploads` dump (couldn't be downloaded automatically - strichnet.com isn't reachable through this environment's network allowlist). One filename was sanitized: the Skype screenshot in `how-to-improve-the-performance-of-unity3d-animations` had a literal `(TM)` symbol and an `@` in its name (`...Skype(TM)-1-scott@strichnet.com_.png`), which is asking for trouble in a URL and on a Windows checkout - renamed to `2015-09-21-11_59_00-skype-1-scott-strichnet-com.png` and the post's Markdown updated to match. Every other filename was left as-is. Verified against a clean build: all 14 files present under `dist/assets/blog/`, every post's `<img src>` / `<a href>` resolves.

The raw uploads dump this was copied from lives at `/wp uploads/` in this folder, gitignored - it's migration source material, not part of the site. Kept in case you want it as a backup; delete it whenever, or keep it, up to you.

## What's NOT migrated, and why

**7 never-published drafts** sitting in the export are excluded entirely, on purpose - they have no slug and no public URL (links like `/?p=145`), so there's no old link to preserve and nothing was ever public to reproduce. Titles, for reference, in case any are worth reviving deliberately:
- "Perfect, Fast & Compact Deserialization of Unknown Types" (2015-09-29)
- "Post-Kickstarter Review: Keeping The Funding Channel Open" (2013-07-29)
- "Configuring a LAN-to-LAN IPsec VPN with Overlapping Networks" (2014-01-16)
- "Using NAT Traversal to Locally Host Servers" (2014-02-05)
- "Compiling a standalone C# application in Windows" (2014-06-11)
- "How we reduced our texture memory footprint by 50% with Unity 5.1" (2015-09-29) - this one in particular reads like handbook material (performance, Unity-specific) rather than blog material, if it's ever finished.
- One untitled draft (2015-08-15), empty title in the export - not migrated, not listed above as an idea.

## Re-running the migration

`python3 scripts/migrate_wordpress.py path/to/export.xml` - idempotent, overwrites the 17 files in `src/content/blog/` by slug. Safe to re-run against a fresher export later; it will only touch posts whose `wp:post_type` is `post` and `wp:status` is `publish`. Note it will NOT re-apply the one filename sanitization above if you re-run against a fresh export with fresh image references - check for that specific `(TM)`/`@` filename again if so.

## Confidentiality note

Per the relaunch plan, all 17 posts are personal/technical material already classified "usable as-is" - none touch Brightrock, Skeleton Crew, or colleague-attributed material. That classification only matters for *new* posts and handbook pages going forward, not this back-catalogue.
