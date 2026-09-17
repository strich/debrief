---
title: "What this is"
status: settled
---

I run a small game studio's technology. That means a large Unity codebase, a
repository full of binary art assets, a build farm, and lately a set of coding
agents that I am trying to make genuinely useful against all of it.

Most writing about AI-assisted development assumes a web application. A tidy
text repository, a diff that fits in a context window, a team that already
wanted the tooling. A game studio is none of those things, and almost nothing
transfers cleanly. This handbook is the part that does not transfer, written
down.

## What it covers

Game-repo infrastructure and AI together, because in practice they are the same
problem. You cannot point an agent at a Unity repository without first having
opinions about serialization, about LFS, and about what a worktree costs when
the working tree is forty gigabytes. The version control and Unity toolchain
sections exist because the AI sections depend on them.

## What it leaves out

How to make games. Design, art direction, and production scheduling are
somebody else's expertise and mostly somebody else's blog.

Model comparisons with a shelf life of about six weeks. Where a specific model
or price matters I will name it and date it, but the aim is to write down the
shape of a problem rather than this month's answer to it.

Anything I have not actually run. There is a great deal of confident writing
about agent workflows by people who have never pointed one at a repository that
fights back.

## What belongs here and what belongs in a post

One test, and it has held up well.

If editing it later would be a lie, it is a post. A field report is tied to a
date and a version. Going back to tidy it up would misrepresent what actually
happened.

If *not* editing it later would be a lie, it is a handbook page. A page about
how we handle LFS has to reflect how we handle LFS now, or it is actively
misleading.

The blog is the raw material. This is what the raw material settled into.
