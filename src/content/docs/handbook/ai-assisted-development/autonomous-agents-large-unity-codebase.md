---
title: "Autonomous agents on a large Unity codebase"
status: working
---

The standard advice for running several coding agents at once is to give each
one its own worktree. Cheap isolation, no interference, and on a normal text
repo it works well.

On a game repo it doesn't work at all, and most of this page is about why.

## Why worktrees fall over here

A worktree is a second checkout sharing one object store. On a source repo
that's nearly free because the working tree is small. On a repo where the
working tree is tens of gigabytes of art fetched through
[LFS](/handbook/version-control/git-lfs-in-practice/), every extra worktree
means pulling all of that down again. Disk goes first, then the LFS bandwidth
bill, then your patience.

Then Unity piles on. Each checkout needs its own `Library`, which gets built by
importing the entire project. A fresh worktree isn't ready when the checkout
finishes. It's ready after a full reimport, and on a big project that's a long
wait before any work starts.

And the editor locks the project directory, so you can't dodge it by pointing
several processes at one checkout. That's covered in
[headless builds](/handbook/unity-toolchain/headless-builds-and-batchmode/).

So each extra parallel agent costs a huge amount of disk and a serious amount of
time, all paid before it's done anything useful.

## What I do instead

Treat working copies as long-lived infrastructure instead of something you spin
up per task. A few checkouts that stay warm and get reused across lots of tasks
beat a fresh worktree per agent by a mile. The `Library` folder is the thing
you're protecting.

Prefer work that doesn't need a working copy at all. Review, triage and analysis
can often run against the repo contents without a full checkout, which makes
them nearly free to run in parallel. That's a big part of why
[code review](/handbook/ai-assisted-development/ai-code-review-unity/) was the
first thing I got working.

Where a task really does need a checkout, queue it instead of fanning it out.
That's the thinking behind the
[quota-gated loop](/handbook/ai-assisted-development/quota-gated-agent-loops/),
which runs tasks one after another on purpose.

## The real limit is attention

This is the bit I didn't expect. You'd assume the limit on parallel agents is
hardware or spend. For me it's been how much output a person can actually read.

Every agent run produces something a human has to look at. Four agents in
parallel means four times the review load, all landing on the same person. Past
a pretty low number the work doesn't get any faster. It just queues up behind
that person, and all you've bought is a bigger backlog and a bigger bill.

So the question I care about is how much work each agent can finish without
needing a person at all, which is about scope and verification more than
parallelism. The [Unity CLI](/handbook/unity-toolchain/the-unity-cli/) closing
the loop has been the biggest help there so far.
