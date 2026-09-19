---
title: "Agents in the scene hierarchy"
status: working
---

This is the most valuable thing I have found, and it is not the thing anybody
talks about.

Given a live editor to talk to, a model is remarkably good at inspecting
prefabs and the running scene hierarchy, and at finding what is wrong in them.
Not the code. The wiring. I went into this expecting the win to be generated
C#, and the win has been an agent that can look at the object graph and tell me
which reference is null and why.

## Why this is the half that was missing

A large share of Unity bugs are not in the code at all. A reference left
unassigned. A component on the parent instead of the child. A value overridden
in a prefab variant three levels up. Two objects subscribed to an event where
exactly one should be. The C# is correct in every one of those cases and the
game is still broken.

That half has been out of reach for source-level tooling, and
[the serialization page](/handbook/version-control/unity-serialization/)
explains why. On disk, a prefab is GUIDs and file IDs. Nothing in it is named
in a way a reader can follow, the references point sideways into other files by
identifier, and the first thing any sensible retrieval setup does is exclude
all of it. So the agent's working picture of the project stopped at the
assembly boundary, and everything downstream of that was guesswork.

In
[context for a Unity repo](/handbook/ai-assisted-development/context-for-a-unity-repo/)
I wrote that cross-boundary changes were the thing I had not solved, and that I
suspected it needed the editor in the loop rather than better retrieval. That
guess was right, and this is what it looks like once the editor is there.

## Why it works as well as it does

Through
[the editor's command line interface](/handbook/unity-toolchain/the-unity-cli/)
the same graph arrives already resolved. Named objects, real component types,
actual values, the prefab overrides applied. It stops being an opaque file
format and becomes an ordinary nested data structure with meaningful labels on
it, which is a thing models are extremely good at reading.

The live half adds what no static inspection can give you, which is state after
the game has been running for a while. What the scene declares and what the
scene currently is are different objects, and most of the interesting failures
live in the gap between them. An agent that can enter play mode, let something
happen and then walk the hierarchy is looking at the actual failure rather than
at a description of the setup that produced it.

And it composes with the loop. Read the hierarchy, form a theory, change one
thing, re-enter play mode, read it again. That is the ordinary way a person
debugs this, and it is now something an agent can do end to end.

## How to keep it honest

**Make it read before it reasons.** The failure mode is a confident account of
a hierarchy that was half inspected and half assumed, and it reads exactly like
the real thing. Asking for the inspection output alongside the conclusion costs
almost nothing and catches it.

**Have it re-read after the change.** A fix that was applied to the object in
memory and not to the asset looks like a success until the next domain reload.
Verification is a second read, not the absence of an error.

**Scope the read.** A full hierarchy dump on a real scene is enormous and most
of it is irrelevant. Pointing at a subtree gets better answers and costs less,
for the same reason narrowing context works everywhere else.
