# TODO

Internal working list. Not linked from the site or the README, and not written
for anyone else to read.

## Verify

- [ ] Cloudflare Pages project connected to `github.com/strich/debrief`, build
      command `npm run build`, output `dist`.
- [ ] `strichnet.com` added as a custom domain on the Pages project and the
      certificate issued.
- [ ] Host canonicalization redirect rule and "Always Use HTTPS" on the zone,
      per `docs/REDIRECTS.md`. DNS was already on Cloudflare.
- [ ] Confirm the model version named in
      `docs/handbook/ai-assisted-development/running-a-long-agent-session.md`.
      Written as DeepSeek 4.1 from the working notes, unverified, and it is in
      copy published under my name.

## Handbook pages waiting on measurements

Nine pages are still `researching`, and all of them are honest about it. They
need numbers rather than prose.

- `ai-cost-discipline/cost-per-merged-pr.md` and `model-routing.md` and
  `byo-keys-vs-per-seat-saas.md`. The whole section is waiting on real spend
  figures over a long enough window to mean something.
- `ci-build-infrastructure/build-farm-shape.md`, `caching-that-helps.md`,
  `artifacts-and-distribution.md`. Blocked on the rebuild being finished.
- `ai-assisted-development/sentry-ticket-pr-triage.md`.
- `people-and-practice/review-culture.md`.
- `version-control/perforce-comparison-honestly.md`.

Open questions carried on `unity-toolchain/the-unity-cli.md`, which are the
next measurable thing and probably the easiest win here:

- Per-call latency against a project with a fully populated `Library`, not a
  sample project.
- Behaviour across a domain reload, and whether a long session survives one.
- Whether failures come back structured or have to be parsed out of logs.

## Follow-ups promised in posts

- **Generalised QA agent.** The cheap first experiment is to point it at a
  build with known bugs and see whether the known bugs land anywhere near the
  top of what it reports. If they do not, the rest does not matter. Post says
  this is the next thing to actually try.
- **Sidecar narrator.** First version is a second session subscribed to the
  first one's output, instructed to summarise decisions rather than actions,
  piped into something that speaks. Post commits to writing up whether it
  survives a week of real use, which is where ideas of this kind usually stop.
- **Showing colleagues.** Lead with the failures rather than the win. The
  stalls, the run that sat waiting for window focus, the class of bug it cannot
  see. Whether this actually happens is the open question the post ends on.
- **Linear as the index.** The workaround needs a habit I have not formed,
  which is writing the session out at the end when the interesting part is
  over. Worth revisiting in a month to see whether it held.

## Site itself

- [ ] `relatedPosts` is in the docs schema in `src/content.config.ts` and
      nothing renders it. Either render it on handbook pages as the reverse of
      the post side's `feedsHandbookPage` callout, or drop the field.
- [ ] Build warns that the `i18n` collection does not exist. Harmless, comes
      from Starlight, worth silencing if it is a one-liner.
- [ ] `z.string().url()` is deprecated in the current Zod and used three times
      in `src/content.config.ts`. Shows as hints in `astro check`.
- [ ] Only two posts carry `feedsHandbookPage`. Worth a pass over the rest once
      there are more current posts, though the 17 archive posts should probably
      stay without it.
- [ ] The `ai` tag is new and now has four posts. Keep an eye on whether the
      tag set needs another pass the way the archive did, or whether nine is
      where it settles.
