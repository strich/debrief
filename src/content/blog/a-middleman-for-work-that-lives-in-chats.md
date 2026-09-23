---
title: "A middleman for work that lives in chats"
description: "My projects and ideas are scattered across harnesses and chats that can't see each other, so I'm trying the Linear MCP as the middleman."
pubDate: 2026-09-19T10:00:00Z
tags: [ai, tooling, studio]
stage: seedling
draft: false
---

I've lost track of my own work, and honestly the tooling is a big part of why.

Not in any dramatic way. Everything's *somewhere*. But at any given moment I've
got projects sitting in a coding harness, ideas parked halfway through a chat,
plans in a markdown file in one repo or another, and a couple of things that
only exist as a conversation I remember having. Each of those is a reasonable
place for that thing to be. All together it's a mess, and I can't answer "what
am I in the middle of?" without going and looking in four places.

## The bit that makes it worse

Claude desktop can't see its own projects from inside a chat.

That sounds like a small limitation and it's actually the whole problem. A chat
knows everything about itself and nothing about any of the others. So the one
tool that's otherwise great at reading a pile of messy material and telling me
what's in it can't do that for its own contents. It can't organise itself,
because from where it's sitting there's nothing to organise.

So the index has to live outside, somewhere every session can get to.

## Linear as the middleman

What I've been trying (a bit tentatively) is pushing everything into Linear
through its MCP server and using that as the shared place. A session that
produces something worth remembering creates or updates an issue. A new session
asks Linear what's open instead of asking me.

It works better than I expected, for a pretty boring reason. A tracker is
already the right shape. Things in it have a state, an owner and an order, and
they're written to be read by someone who wasn't there when they were created.
A chat transcript has none of that, and it's exactly what you need when the
reader is a fresh session that remembers nothing.

It's the same thing I do inside a long piece of work, where
[the conclusions go into an md file and the chat is disposable](/handbook/ai-assisted-development/running-a-long-agent-session/).
Linear is that, one level up.

## It's a workaround

To be clear, it's a workaround. The assistant can't see across its own
projects, and this needs a habit I don't reliably have yet. Namely remembering to write things down at the end of a session, when the
interesting part's over and I want to go and do something else. :/

So really I've gone from four scattered places to one place plus a habit I
haven't formed. Progress, I think? Not much of a headline though.
