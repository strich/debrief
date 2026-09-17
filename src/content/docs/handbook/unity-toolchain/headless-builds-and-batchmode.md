---
title: "Headless builds and batchmode"
status: working
---

Everything automated about a Unity project runs through the editor in batchmode.
There is no separate build tool. The same editor a developer opens is the thing
your build agent drives, with no window and a method name to call.

## The shape of it

You invoke the editor binary with a project path, a static method to execute,
and flags telling it not to expect a human. In practice that means batchmode,
no graphics device where the build does not need one, and an explicit quit so
the process actually exits.

The method you point it at is ordinary C# in an editor script, and it is
responsible for configuring the build and calling the build pipeline itself.
This is the important part. Your build configuration is code in your repository,
not settings in a CI dashboard, which means it is versioned and reviewable along
with everything else.

## The parts that bite

**Exit codes lie by omission.** A build can fail in ways that still exit
cleanly. Check the build result the pipeline hands back and set the exit code
from it yourself rather than trusting the process to have done the right thing.

**The log is the only real output.** Batchmode failures are frequently
uninformative at the process level and perfectly clear in the editor log. Always
capture it, always publish it as a build artifact, and do not make anyone remote
into a machine to read it.

**Licensing is a real failure mode.** The editor needs to be activated, and
activation on ephemeral agents is the single most common reason a working build
pipeline suddenly stops working.

**Only one editor per project directory.** Unity takes a lock on the project.
Two concurrent builds against the same checkout will not queue politely, they
will fail, and the failure will be confusing. This constrains build farm layout
more than anything else, and it is the same constraint that shapes
[running agents in parallel](/handbook/ai-assisted-development/autonomous-agents-large-unity-codebase/).

**Nographics is not always safe.** Anything touching the render pipeline,
baking, or graphics API validation may need a real device. Where a build needs
one, it needs a real machine, and that pushes back on the build farm shape.

## Why the first build on a fresh agent is slow

Unity's `Library` folder holds the imported form of every asset. It is derived
data, so it is correctly kept out of the repository, and it is also enormous and
expensive to regenerate. A clean agent has to reimport the entire project before
it can build anything.

Getting this right is most of what makes CI fast on a Unity project. It is
covered in
[Caching that helps](/handbook/ci-build-infrastructure/caching-that-helps/).
