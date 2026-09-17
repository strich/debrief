---
title: "Autonomous agents on a large Unity codebase"
status: working
---

The standard advice for running several coding agents at once is to give each
one its own worktree. Cheap isolation, no interference, and on a text repository
it works well.

On a game repository it does not work at all, and understanding why is most of
what this page is about.

## Why worktrees fail here

A worktree is a second checkout sharing one object store. On a source repository
that is nearly free, because the working tree is small. On a repository where
the working tree is tens of gigabytes of art assets fetched through
[LFS](/handbook/version-control/git-lfs-in-practice/), each additional worktree
means materialising all of that again. Disk goes first, then the LFS bandwidth
bill, then your patience.

Then Unity adds its own multiplier. Each checkout needs its own `Library`, which
is derived data that has to be built by importing the entire project. A fresh
worktree is not ready when the checkout finishes. It is ready after a full
reimport, which on a large project is a long wait before any work starts.

And the editor locks the project directory, so you cannot avoid the problem by
pointing several processes at one checkout. That constraint is described in
[headless builds](/handbook/unity-toolchain/headless-builds-and-batchmode/).

The result is that the cost of an additional parallel agent is not a few hundred
megabytes and a second. It is a large amount of disk and a serious amount of
time, paid before the agent does anything useful.

## What follows from that

Treat working copies as durable infrastructure rather than something you create
per task. A small number of long-lived checkouts that stay warm, reused across
many tasks, beats a fresh worktree per agent by a wide margin. The `Library`
folder is the asset you are protecting.

Prefer work that does not need a working copy at all. Review, triage and
analysis can often run against the repository contents without a materialised
tree, which makes them nearly free to parallelise. That is a large part of why
[code review](/handbook/ai-assisted-development/ai-code-review-unity/) was the
first thing to get working.

Where a task genuinely needs a tree, queue it rather than fanning it out. This
is the reasoning behind the
[quota-gated loop](/handbook/ai-assisted-development/quota-gated-agent-loops/),
which runs tasks in sequence deliberately.

## The real ceiling is attention, not compute

This is the part I did not expect. It would be easy to assume the limit on
parallel agents is hardware or spend. In practice it is how much output a person
can actually read.

Every agent run produces something a human has to evaluate. Four agents working
in parallel produce four times the review load, landing on the same reviewer.
Past a fairly low number the work does not get faster, it gets queued behind a
person, and the only thing you have bought is a larger backlog and a bigger
bill.

Which means the useful question is not how many agents you can run. It is how
much work each one can complete without needing a person, and that is a question
about scope and verification rather than about parallelism.
