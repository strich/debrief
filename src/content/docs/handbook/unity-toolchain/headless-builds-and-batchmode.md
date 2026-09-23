---
title: "Headless builds and batchmode"
status: working
---

Everything automated on a Unity project goes through the editor in batchmode.
There's no separate build tool. The same editor a developer opens is what your
build agent drives, just with no window and a method name to call.

## How it works

You run the editor binary with a project path, a static method to execute, and
flags telling it there's no human around. That usually means `-batchmode`,
`-nographics` where the build doesn't need a graphics device, and `-quit` so
the process actually exits.

The method is plain C# in an editor script, and it's responsible for
configuring the build and calling the build pipeline. This is the important
bit. Your build configuration lives in the repo as code instead of as settings
in a CI dashboard, so it's versioned and reviewable with everything else.

## The parts that bite

**Exit codes can't be trusted.** A build can fail and still exit cleanly. Check
the build report the pipeline hands back and set the exit code from that
yourself.

**The log is the only real output.** Batchmode failures are often useless at the
process level and perfectly clear in the editor log. Always capture it
(`-logFile`), always publish it as a build artifact, and don't make anyone
remote into a machine to read it.

**Licensing.** The editor has to be activated, and activation on throwaway
agents is the most common reason a working pipeline suddenly stops working.

**One editor per project directory.** Unity locks the project. Two builds
against the same checkout at once won't queue politely - They'll fail, and the
error will be confusing. This constrains the build farm layout more than
anything else, and it's the same thing that shapes
[running agents in parallel](/handbook/ai-assisted-development/autonomous-agents-large-unity-codebase/).

**Nographics isn't always safe.** Anything touching the render pipeline, baking
or graphics API validation might need a real device. If a build needs one it
needs a real machine, and that pushes back on the whole farm design.

## Why the first build on a fresh agent is so slow

Unity's `Library` folder holds the imported version of every asset. It's
derived data so it rightly stays out of the repo, but it's also enormous and
slow to regenerate. A clean agent has to reimport the whole project before it
can build anything.

Getting this right is most of what makes CI fast on a Unity project, and it's
covered in
[Caching that helps](/handbook/ci-build-infrastructure/caching-that-helps/).
