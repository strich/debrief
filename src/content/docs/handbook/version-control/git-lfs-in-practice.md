---
title: "Git LFS in practice"
status: settled
---

Large File Storage replaces binary files in your repository with small text
pointers, and keeps the real content on a separate server fetched on demand.
The pitch is that your history stops carrying every revision of every texture.
The pitch is accurate. Getting there on an existing project is the hard part.

I migrated War for the Overworld across in 2017, from roughly eighteen thousand
commits and a repository that had grown past the point where our host could
serve a fresh clone. The full account is in
[Migrating your project to Git LFS](/blog/migrating-your-project-to-git-lfs).

## What the migration actually involves

It is a history rewrite. Every commit that ever touched a tracked file type gets
new hashes, which means every clone anyone holds becomes invalid on the day you
cut over. This is not a thing you can roll out gradually, and it is why the
scheduling matters more than the tooling.

Work on a mirror, never on the live repository. Rewriting takes hours on a large
history and you will want to run it more than once, because the first pass
always reveals a file type you forgot.

Decide what to track before you start, not during. The pattern list ends up in
`.gitattributes` and changing it later means either another rewrite or a
repository where half the textures are in LFS and half are not.

Plan the cutover as a team event. Everyone stops, everyone re-clones, everyone
confirms they can build. Trying to let people migrate at their own pace produces
a week of confusing breakage.

## What to track

Anything binary that changes. Textures, audio, video, compiled libraries, and
the large imported source files from art tools.

Do not track things that are small and diffable just because they are numerous.
The pointer indirection costs you something on every checkout, and for a file
that Git already handles well you are paying it for nothing.

## The parts people are surprised by

Storage and bandwidth are metered, and art teams generate more of both than
anyone estimates. This is a real budget line, not a rounding error.

A shallow or partial clone interacts with LFS in ways that are easy to get
wrong, particularly on build agents. Getting this right is most of what makes
CI checkouts fast, and it is covered in
[Caching that helps](/handbook/ci-build-infrastructure/caching-that-helps/).

Locking exists and is worth using for files that genuinely cannot be merged.
It only works if the whole team actually uses it, which makes it a social
problem wearing a technical hat.
