---
title: "Project and package layout"
status: working
---

How a Unity project is laid out determines what can be automated against it,
what can be tested in isolation, and how much of the project a tool has to
understand before it can do anything useful.

## Assets and Packages

`Assets` is the historical home for everything. `Packages` is the newer
mechanism, where code is a versioned unit with declared dependencies, resolved
through the package manager.

The practical difference is boundaries. Anything in `Assets` can reference
anything else in `Assets`, and on a project of any age it usually does. A
package declares what it depends on, which means you can reason about it
without holding the whole project in your head.

That property is worth a great deal beyond tidiness, and it is the main reason
to care about layout at all on a project driven by tooling.

## Assembly definitions

An assembly definition file splits a folder of C# into its own compiled
assembly with explicit references to other assemblies.

Without them, every script in the project compiles into one enormous assembly,
so touching any file recompiles everything. On a large codebase that is the
difference between a few seconds and a coffee break, several hundred times a
day.

With them you get real boundaries. A change to a leaf assembly recompiles that
assembly. Test assemblies can reference production code without production code
being able to reference tests. Circular dependencies become a compile error
rather than a slow architectural decay.

The cost is that they make existing tangles visible, and retrofitting them onto
a mature codebase mostly consists of discovering that two things you believed
were separate are not. That is useful information, arriving inconveniently.

## Why this matters for agents

An agent working on a large codebase has the same problem a new engineer does.
It cannot hold the whole thing at once, so it needs to know which part of the
tree is relevant.

Assembly definitions are the most honest map of that in a Unity project,
because they are enforced. A folder convention describes what someone intended.
An assembly reference describes what the compiler will actually allow. When I
am deciding what context to hand a tool, the assembly graph is the structure I
reach for first, and that is developed in
[Context for a Unity repo](/handbook/ai-assisted-development/context-for-a-unity-repo/).
