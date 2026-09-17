---
title: "Git for game projects: what breaks"
status: settled
---

Git works fine on a game project right up until it does not, and the failure is
gradual enough that you tend to notice it about two years too late. This is the
oldest thread in the handbook. I first wrote about it in 2013 and every problem
described here is still live.

## The shape of the problem

Git was built for source code. It assumes files are text, that diffs are small
and meaningful, and that history compresses well. A game repository violates all
three. Most of its volume by byte is art, audio and serialised scene data. None
of it diffs. None of it compresses much, because it is usually compressed
already.

The result is that repository size grows roughly linearly with the number of
times anyone touches a binary file, and it never comes back down. Every revision
of a texture is stored in full, forever.

## What breaks first

**Clone time.** The first symptom, and the one that gets reported as "the repo
is slow". A new starter waiting most of a day for a checkout is a real cost.

**Memory on Windows.** For a long stretch the Windows Git build was 32-bit, and
a large repacking operation would simply run out of address space. Raising the
pack limits so Git stops trying to hold a giant pack in memory at once was the
fix that kept things moving. I wrote that up in
[Tuning Git for large binary repositories](/blog/tuning-git-for-large-binary-repositories).

**Hosting limits.** Providers have soft limits they do not advertise loudly. We
reached a point where our host could no longer reliably serve a fresh clone of
our own repository, which is the moment the problem stops being an annoyance and
starts being an outage.

**Merging.** Two artists touching the same scene produces a conflict Git cannot
help you with. See [Unity serialization](/handbook/version-control/unity-serialization/)
for why, and for the partial fixes.

## What actually helps

Version the source of truth, not the derived output. If a texture can be
regenerated from a master file, the master belongs in the repository and the
output does not.

Move binaries to [LFS](/handbook/version-control/git-lfs-in-practice/) before
you need to, not after. Migrating a clean repository is a morning. Migrating
eighteen thousand commits of accumulated history is a project.

Decide the branching model early and keep it boring. Most version control pain
on a game team is not conceptual, it is repetitive, and repetitive friction is
what people quietly stop doing.

## Why this matters for agents

This is the direct ancestor of the problem in
[Autonomous agents on a large Unity codebase](/handbook/ai-assisted-development/autonomous-agents-large-unity-codebase/).
Every technique for running several agents at once assumes checkouts are cheap.
On a game repository they are not, and that single fact reshapes the whole
approach.
