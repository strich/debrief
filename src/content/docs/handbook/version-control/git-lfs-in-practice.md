---
title: "Git LFS in practice"
status: settled
---

LFS swaps the binary files in your repo for small text pointers and keeps the
real content on a separate server, fetched when you need it. The pitch is that
your history stops carrying every revision of every texture, and the pitch is
accurate. The hard part is getting an existing project there.

I migrated our last game's repo in 2017. 18,000+ commits, 35GB, and far enough
gone that our host couldn't serve a fresh clone anymore. It was a lot more
painful than I'd imagined, and the step by step is in
[Migrating your project to Git LFS](/blog/migrating-your-project-to-git-lfs).

## What the migration actually involves

It's a history rewrite. Every commit that ever touched a tracked file type gets
a new hash, so every clone anyone has becomes invalid the day you cut over. You
can't roll it out gradually, which is why the scheduling matters more than the
tooling.

Work on a mirror, never the live repo. A rewrite takes hours on a big history
(days, in my case) and you'll want to run it more than once, because the first
pass always turns up a file type you forgot.

Decide what to track before you start. The pattern list ends up in
`.gitattributes`, and changing it later means either another rewrite or a repo
where half the textures are in LFS and half aren't.

Treat the cutover as a team event. Everyone stops, everyone re-clones, everyone
checks they can build. Letting people migrate in their own time gives you a week
of confusing breakage.

## What to track

Anything binary that changes. Textures, audio, video, compiled libraries, and
the big source files from art tools.

Don't track small diffable files just because there are lots of them. The
pointer indirection costs you something on every checkout, and for a file Git
already handles well you're paying that for nothing.

Unity scenes are the interesting one. I left `.unity` files out of LFS because
our scenes changed constantly, and every change is a whole new LFS object.
Putting them in blew the LFS store up by about five times. They're text and Git
diffs them fine, so despite the size they stayed in plain Git.

## What caught me out

Storage and bandwidth are metered, and art teams generate way more of both than
anyone estimates. It's a real budget line.

Hosts have their own limits on top of LFS. When I did ours GitHub had a 100MB
file size limit and a 1GB limit on a single push, and you can't split a mirror
push into parts. We needed their support team to relax both temporarily. They
were great about it, but plan for that conversation.

Shallow and partial clones interact with LFS in ways that are easy to get
wrong, especially on build agents. Getting it right is most of what makes CI
checkouts fast, and that's in
[Caching that helps](/handbook/ci-build-infrastructure/caching-that-helps/).

Locking exists and it's worth using for files that genuinely can't be merged.
It only works if the whole team actually uses it though, so it's really a
people problem.
