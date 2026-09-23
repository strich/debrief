---
title: "Project and package layout"
status: working
---

How a Unity project is laid out decides what you can automate against it, what
you can test in isolation, and how much of the project a tool has to understand
before it can do anything useful.

## Assets vs Packages

`Assets` is where everything has historically lived. `Packages` is the newer
way, where code is a versioned unit with declared dependencies that the package
manager resolves.

The practical difference is boundaries. Anything in `Assets` can reference
anything else in `Assets`, and on a project of any age it usually does. A
package declares what it depends on, so you can reason about it without holding
the whole project in your head.

That's worth a lot more than tidiness. It's the main reason to care about layout
at all if tools are going to be working on the project.

## Assembly definitions

An assembly definition (`.asmdef`) splits a folder of C# into its own compiled
assembly, with explicit references to other assemblies.

Without them every script compiles into one huge assembly, so touching any file
recompiles everything. On a large codebase that's the difference between a few
seconds and a coffee break, hundreds of times a day.

With them you get real boundaries. Change a leaf assembly and only that
recompiles. Test assemblies can reference production code without production
code being able to see the tests. Circular dependencies become a compile error
instead of slow architectural rot.

The catch is they make existing tangles visible. Retrofitting them onto a mature
codebase is mostly discovering that two things you thought were separate
aren't. Useful to know, just not when you're trying to get something else done.

## Why this matters for agents

An agent on a big codebase has the same problem as a new engineer. It can't
hold the whole thing at once, so it needs to know which part of the tree
matters.

Assembly definitions are the most honest map of that in a Unity project because
they're enforced. A folder convention tells you what someone intended. An
assembly reference tells you what the compiler will actually allow. When I'm
deciding what context to give a tool, the assembly graph is the first thing I
reach for, and there's more on that in
[Context for a Unity repo](/handbook/ai-assisted-development/context-for-a-unity-repo/).
