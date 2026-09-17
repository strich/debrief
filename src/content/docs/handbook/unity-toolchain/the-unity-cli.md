---
title: "The Unity CLI"
status: researching
---

Driving the editor from outside has always been possible through
[batchmode](/handbook/unity-toolchain/headless-builds-and-batchmode/), but
batchmode is a blunt instrument. It starts an editor, runs one method, and
exits. For a build that is exactly right. For a tool that wants to ask the
editor a question and act on the answer, it is the wrong shape entirely.

A first-class command line interface to a running editor changes that, and it is
the piece that has been missing for agent work. This page is where I am putting
what I find as I evaluate it against a real project. It is marked researching
because I am partway through, and the honest state of it is a set of open
questions rather than a set of answers.

## Why it matters here

Most of what I want from an agent working on a Unity project is not "build the
game". It is smaller and more conversational. Reimport this asset and tell me
what broke. Run this test assembly. Resolve this reference. Each of those is a
round trip, and paying full editor startup for each one makes the whole approach
unworkable.

If the editor can stay warm and answer repeatedly, the economics change
completely. That is the claim I am testing.

## What I am measuring

**Per-call latency at real repository scale.** Small sample projects prove
nothing here. The number that matters is what a call costs against a project
with a fully populated `Library`, because that is the only condition anyone
actually works under.

**Behaviour across a domain reload.** Recompiling scripts tears down and
recreates the managed domain. Anything holding state across that boundary has to
survive it or be re-established, and how gracefully that is handled determines
whether a long-running session is viable or whether every script change means
starting over.

**Whether it genuinely runs unattended.** An editor that needs window focus, or
that can raise a modal dialog and sit waiting for a click, is not automatable no
matter what the interface looks like. This is the question I most want a
definite answer to, because it is the one that decides whether any of it can run
on a build agent.

**How failure is reported.** Structured errors I can branch on, or log output I
have to parse.

## What I will write here once I know

A straight account of what works, what the per-call cost actually is, and which
of the above turn out to be real blockers rather than teething problems. If the
answer is that it is not yet ready for unattended use, that will be what this
page says.
