---
title: "What this is"
status: settled
---

I look after the technology at a small game studio. That means a large Unity
codebase, a repo full of binary art assets, a build farm, and lately a handful
of coding agents I'm trying to make genuinely useful against all of it.

Most of what gets written about AI-assisted development assumes a web app. A
tidy text repo, a diff that fits in a context window, a team that already
wanted the tooling. A game studio is none of those, and very little of that
advice transfers. This handbook is my notes on the parts that don't.

## What's in it

Game repo infrastructure and AI together, because they turn out to be the same
problem. You can't point an agent at a Unity repo without first having opinions
about serialization and LFS, and about what a worktree costs when the working
tree is forty gigabytes. That's why the version control and Unity toolchain
sections are here at all. The AI sections lean on them constantly.

## What isn't

How to make games. Design, art direction and production scheduling are other
people's expertise and mostly other people's blogs.

Model comparisons. They go stale in about six weeks. Where a specific model or
price matters I'll name it and date it, but I'm trying to write down the shape
of a problem rather than this month's answer to it.

Anything I haven't actually run. There's a lot of confident writing about agent
workflows from people who've never pointed one at a repo that fights back.

## Post or page?

I use one test for this and it's held up pretty well.

If editing it later would be a lie, it's a post. A field report is tied to a
date and a version, and going back to tidy it up would misrepresent what
actually happened.

If *not* editing it later would be a lie, it's a handbook page. A page about how
we handle LFS has to describe how we handle LFS now, otherwise it's actively
misleading.
