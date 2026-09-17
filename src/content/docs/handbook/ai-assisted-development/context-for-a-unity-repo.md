---
title: "Context for a Unity repo"
status: working
---

Every agent task on a large codebase comes down to one question. Out of several
thousand files, which handful does this job actually need.

Get it right and an ordinary model does good work. Get it wrong and the best
model available produces something confident and irrelevant, having never seen
the file that mattered.

## Why the usual answers underperform here

Most retrieval approaches treat a repository as a pile of text and select by
similarity to the request. On a Unity project that pile is mostly not text a
model should be reading. Scenes, prefabs, imported assets and meta files
outnumber the C# considerably, and by raw volume they dominate it. Similarity
search over that returns serialised data with the right words in it, which is
worse than returning nothing.

The first job is therefore exclusion rather than selection. Once
[the data files are filtered out](/handbook/version-control/unity-serialization/),
what remains is a normal C# codebase and normal techniques start working again.

## What has worked

**Use the assembly graph as the map.** Assembly definitions are the one
structure in a Unity project that is actually enforced, as described in
[project and package layout](/handbook/unity-toolchain/project-and-package-layout/).
Folder conventions record what someone intended. Assembly references record what
the compiler permits. Starting from the assembly that owns the change and
expanding along real references produces a much better candidate set than
similarity alone.

**Let the compiler answer structural questions.** Find every caller, find the
implementations of this interface, find what references this type. These have
exact answers and no model should be guessing at them.

**Keep a written description of the architecture in the repository.** The
single highest-value piece of context is usually a short document explaining
what the major systems are and how they relate. It helps agents for the same
reason it helps a new engineer, and it goes stale for the same reason too, so
it has to be maintained like anything else here.

**Budget for what gets re-read.** Context assembled fresh for every step is
paid for every step. Structuring it so the stable parts stay stable is a cost
decision as much as a quality one, which is the subject of
[prompt cache economics](/handbook/ai-cost-discipline/prompt-cache-economics/).

## What I have not solved

Cross-boundary changes, where the C# change is correct but the corresponding
change belongs in a scene or prefab. The code half is tractable. Connecting it
reliably to the asset half is not something I have working, and I suspect it
needs the editor in the loop rather than better retrieval. That thread continues
in [the Unity CLI](/handbook/unity-toolchain/the-unity-cli/).
