---
title: "A middleman for work that lives in chats"
description: "Projects and half-formed ideas scattered across harnesses and chat sessions, and why the index has to live somewhere the assistants can all reach."
pubDate: 2026-09-19T10:00:00Z
tags: [ai, tooling, studio]
stage: seedling
draft: false
---

I have lost track of my own work, and the tooling is why.

Not lost in a dramatic sense. Everything is somewhere. But at any given moment
I have projects sitting in a coding harness, ideas parked halfway through a
chat, plans written into a markdown file in one repository, and a couple of
things that exist only as a conversation I remember having. Each of those is a
reasonable place for that thing to be. Collectively they are not a system, and
I cannot answer the question "what am I in the middle of" without going and
looking in four places.

## The specific thing that makes it worse

An assistant cannot see its own projects from inside a conversation.

That sounds like a small limitation and it is actually the whole problem. A
chat knows everything about itself and nothing about its siblings. Which means
the one tool that is otherwise excellent at reading a pile of unstructured
material and telling me what is in it is structurally prevented from doing that
to its own contents. It cannot self-organise, because from where it is sitting
there is nothing to organise.

So the index has to live outside, in something every session can reach.

## Leaning on a tracker as the middleman

What I have been doing, tentatively, is pushing everything at Linear through
its MCP server and treating that as the shared surface. A session that produces
something worth remembering writes an issue or updates one. A session that
starts asks the tracker what is open rather than asking me.

This works better than it deserves to, for an unglamorous reason. A tracker is
already the right shape. It has state, it has an owner, it has an ordering, and
it is designed to be read by someone who was not present for the conversation
that created the item. Those are exactly the properties a chat transcript
lacks, and they are the properties you need when the reader is a fresh session
with no memory of anything.

It is also consistent with how I already handle long pieces of work, where
[the conclusions go into a file and the transcript stays disposable](/handbook/ai-assisted-development/running-a-long-agent-session/).
The tracker is the same idea one level up. Sessions are disposable, the record
is not.

## What I am not claiming

That this is a solution. It is a workaround for an assistant that cannot see
across its own projects, and it costs a discipline I do not reliably have,
which is remembering to write the thing down at the end of a session when the
interesting part is over and I want to go and do something else.

The honest version is that I have moved the problem from four scattered places
to one place plus a habit I have not yet formed. That is progress, but it is
not much of a headline.
