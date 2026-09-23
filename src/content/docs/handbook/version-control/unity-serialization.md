---
title: "Unity serialization: .meta, GUIDs, YAML and merge"
status: working
---

Nearly every awkward thing about a Unity repo comes back to how Unity stores its
data. This is the page the rest of the handbook points at when it needs to
explain that, especially
[AI code review on Unity](/handbook/ai-assisted-development/ai-code-review-unity/).

## Every asset has a .meta file

The `.meta` file sits next to the asset and holds its import settings and, more
to the point, a GUID. The GUID is how Unity identifies the asset internally.
References between objects are stored as that GUID rather than a file path,
which is why you can move and rename assets freely.

So `.meta` files really matter. Lose one, or let two branches generate different
GUIDs for the same asset, and every reference to it silently breaks. Always
commit them, and never regenerate them casually.

## Scenes and prefabs are YAML

With Force Text turned on in the editor's asset serialization settings, scenes
and prefabs get saved as a Unity-flavoured YAML document. That's a big
improvement over binary because it means a diff exists at all. A readable diff
is another matter.

The format is a flat list of objects keyed by file IDs, with references between
them by number. Moving one object in the hierarchy can rewrite big chunks of the
file. The text diff and the actual change are only loosely related, and
sometimes barely related at all.

Unity ships a merge tool for these files (UnityYAMLMerge) and it's much better
than a line merge. Set it up. A three-way text merge on a scene file gives you
something that parses and is complete nonsense.

## Why this breaks diff-based code review

This is the part that matters for tooling. A reviewer that only sees the diff,
human or model, gets a set of changed lines and is asked whether they're
correct. On a Unity change that falls apart in a few ways.

The diff is mostly data. A change touching a handful of C# lines can drag
thousands of lines of serialised scene churn along with it. By volume the real
change is a rounding error, so anything that selects by size or truncates to
fit a budget throws away exactly the wrong part.

The meaningful change often isn't in the diff at all. A GUID reference moving
from one object to another is one number changing. Nothing in the changed lines
tells you what that number is, and the file that would tell you isn't part of
the diff.

And the text isn't written for a reader. A reviewer that tries to reason about
scene YAML line by line will confidently comment on numbers it can't possibly
understand.

So Unity data files need to be classified and handled on purpose, instead of
being fed to a reviewer as if they were source. What's left after that filter is
C#, and C# review works about as well here as it does anywhere.

The other half of the answer turned out to be the editor. Once an agent can read
the resolved object graph from a running editor, the stuff that's unreadable on
disk becomes readable. That's in
[Agents in the scene hierarchy](/handbook/ai-assisted-development/agents-in-the-scene-hierarchy/).
