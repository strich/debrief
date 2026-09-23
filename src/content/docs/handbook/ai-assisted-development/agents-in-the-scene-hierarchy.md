---
title: "Agents in the scene hierarchy"
status: working
---

This is the most valuable thing I've found so far. It's a personal claim on a
personal site, which is the only standing it needs.

Give a model a live editor to talk to and it's extremely good at inspecting
prefabs and the running scene hierarchy, and at finding what's wrong in them. I
went in expecting the win to be generated C#. The actual win has been an agent
that can look at the object graph and tell me which reference is null and why.

## The half that was missing

A lot of Unity bugs aren't in the code. A reference left unassigned. A
component on the parent instead of the child. A value overridden in a prefab
variant three levels up. Two objects subscribed to an event where only one
should be. The C# is fine in all of those and the game is still broken.

Source-level tooling couldn't reach that half, and
[the serialization page](/handbook/version-control/unity-serialization/)
explains why. On disk a prefab is GUIDs and file IDs. Nothing is named in a way
you can follow, references point sideways into other files by ID, and the first
thing any sensible retrieval setup does is exclude the lot. So an agent's
picture of the project stopped at the C#, and everything past that was
guesswork.

Back in
[context for a Unity repo](/handbook/ai-assisted-development/context-for-a-unity-repo/)
I said cross-boundary changes were the thing I hadn't solved, and that I
suspected it needed the editor in the loop more than better retrieval. That was
right, and this is what it looks like with the editor there.

## Why it works so well

Through [the Unity CLI](/handbook/unity-toolchain/the-unity-cli/) the same graph
comes back already resolved. Named objects, real component types, actual
values, prefab overrides applied. It stops being an opaque file format and
becomes a normal nested data structure with sensible labels on it, and models
are extremely good at reading those.

The live part adds something static inspection just can't give you, which is
the state after the game has been running a while. What the scene says it is and
what it currently is are different things, and most of the interesting bugs
live in the gap. An agent that can enter play mode, let something happen and
then walk the hierarchy is looking at the actual failure.

And it fits the loop. Read the hierarchy, form a theory, change one thing, play
again, read it again. That's how I'd debug it by hand, and now an agent can do
the whole thing.

## Keeping it honest

**Make it read before it reasons.** The failure mode is a confident account of a
hierarchy it half inspected and half assumed, and it reads exactly like the real
thing. Asking for the inspection output alongside the conclusion costs almost
nothing and catches it.

**Have it re-read after the change.** A fix applied to the object in memory but
not to the asset looks like it worked right up until the next domain reload. No
error isn't the same as verified.

**Keep the read small.** A full hierarchy dump on a real scene is huge and
mostly irrelevant. Pointing it at a subtree gets better answers and costs less.
