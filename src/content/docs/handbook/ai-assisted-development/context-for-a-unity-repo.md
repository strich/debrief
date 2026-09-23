---
title: "Context for a Unity repo"
status: working
---

Every agent task on a big codebase comes down to one question. Out of several
thousand files, which handful does this job actually need?

Get it right and an ordinary model does good work. Get it wrong and the best
model around will produce something confident and irrelevant, having never seen
the file that mattered.

## Why the usual approaches struggle here

Most retrieval treats a repo as a pile of text and picks files by similarity to
the request. On a Unity project most of that pile isn't text a model should be
reading. Scenes, prefabs, imported assets and meta files massively outnumber the
C#, and by raw size they dominate it. Similarity search over that gives you
serialised data with the right words in it, which is worse than getting nothing.

So the first job is excluding things. Once
[the data files are filtered out](/handbook/version-control/unity-serialization/),
what's left is a normal C# codebase and normal techniques start working again.

## What's worked

**Use the assembly graph as the map.** Assembly definitions are the one
structure in a Unity project that's actually enforced (see
[project and package layout](/handbook/unity-toolchain/project-and-package-layout/)).
Folder conventions tell you what someone intended, and assembly references tell
you what the compiler allows. Starting from the assembly that owns the change
and following real references out gives a much better set of candidates than
similarity does.

**Let the compiler answer structural questions.** Every caller of this method,
every implementation of that interface, everything referencing this type. Those
have exact answers and no model should be guessing at them.

**Keep a written description of the architecture in the repo.** The single most
useful piece of context is usually a short doc explaining what the major
systems are and how they fit together. It helps agents for the same reason it
helps a new engineer. It also goes stale for the same reason, so it needs
looking after like everything else.

**Watch what gets re-read.** Context assembled fresh every step gets paid for
every step. Keeping the stable parts stable is a cost decision as much as a
quality one, and that's the subject of
[prompt cache economics](/handbook/ai-cost-discipline/prompt-cache-economics/).

## Where the gap turned out to be

Cross-boundary changes, where the C# change is right but the matching change
belongs in a scene or prefab. The code half was fine. Connecting it reliably to
the asset half was something I didn't have working, and I suspected it needed
the editor in the loop more than it needed better retrieval.

That turned out to be right. Retrieval was never going to reach the asset half,
because there's nothing there worth retrieving as text. It needs a resolved
object graph, which means a running editor. What that looks like is in
[agents in the scene hierarchy](/handbook/ai-assisted-development/agents-in-the-scene-hierarchy/),
and the thing that made it possible is
[the Unity CLI](/handbook/unity-toolchain/the-unity-cli/).
