---
title: "Git for game projects: what breaks"
status: settled
---

Git works fine on a game project right up until it doesn't, and it goes
downhill slowly enough that you tend to notice about two years too late. This
is the oldest thread in the handbook. I first wrote about it in 2013 and every
problem on this page is still live.

## Why games are different

Git was built for source code. It assumes files are text, that diffs are small
and mean something, and that history compresses well. A game repo breaks all of
that. Most of it by size is art, audio and serialised scene data. None of that
diffs, and hardly any of it compresses because it's usually compressed already.

So repo size grows roughly in line with how often anyone touches a binary file,
and it never comes back down. Every revision of every texture is stored in
full, forever.

## What breaks first

**Clone time.** Usually the first symptom, and it gets reported as "the repo is
slow". A new starter waiting most of a day for a checkout is a real cost.

**Memory on Windows.** For a long time there was no 64-bit Git for Windows, and
heavy operations like `git gc` would just run out of memory and crash. Raising
the pack limits so Git stopped trying to hold one giant pack in memory is what
kept us going. That's written up in
[Tuning Git for large binary repositories](/blog/tuning-git-for-large-binary-repositories).

**Hosting limits.** Hosts have soft limits they don't advertise very loudly. Our
old repo got to 35GB over 18,000+ commits, and Bitbucket (who to be fair had
never applied their 1GB repo limit to us) fell over whenever anyone tried a
fresh clone. That's the point where it stops being annoying and becomes an
outage.

**Merging.** Two artists touching the same scene gives you a conflict Git can't
help with. [Unity serialization](/handbook/version-control/unity-serialization/)
covers why, and the partial fixes.

## What actually helps

Version the source of truth and leave the derived output out. If a texture can
be regenerated from a master file, the master goes in the repo and the export
doesn't.

Move binaries to [LFS](/handbook/version-control/git-lfs-in-practice/) before
you need to. Migrating a clean repo is a morning. Migrating 18,000 commits of
history took me days of running and re-running a migration tool, plus GitHub
support relaxing two of their limits for us.

Pick a branching model early and keep it boring. Most version control pain on a
game team is dull and repetitive, and repetitive friction is exactly the stuff
people quietly stop doing.

## Why this matters for agents

This is the direct ancestor of the problem in
[Autonomous agents on a large Unity codebase](/handbook/ai-assisted-development/autonomous-agents-large-unity-codebase/).
Every technique for running several agents at once assumes checkouts are cheap.
On a game repo they're very much not, and that one fact changes the whole
approach.
