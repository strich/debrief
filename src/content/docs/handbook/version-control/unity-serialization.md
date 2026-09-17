---
title: "Unity serialization: .meta, GUIDs, YAML and merge"
status: working
---

Almost every awkward thing about a Unity repository traces back to how Unity
stores its data. This page is the reference the rest of the handbook points at,
and in particular it is the reasoning behind
[AI code review on Unity](/handbook/ai-assisted-development/ai-code-review-unity/).

## Every asset has a .meta file

Import settings, and critically a GUID, live in a sidecar `.meta` file next to
the asset. The GUID is how Unity identifies the asset internally. References
between objects are stored as that GUID, not as a file path, which is what
allows you to move and rename assets freely.

The consequence is that `.meta` files are not incidental. Losing one, or letting
two branches generate different GUIDs for the same asset, silently breaks every
reference to it. They must be committed, always, and never regenerated
casually.

## Scenes and prefabs are YAML

With text serialization enabled, scenes and prefabs are a Unity-flavoured YAML
document. This is a genuine improvement over the binary format, because it means
a diff exists at all. It is not the same as a diff being readable.

The format is a flat list of objects keyed by file IDs, with references between
them by number. Moving an object in the hierarchy can rewrite large sections.
The textual diff and the conceptual change are only loosely related, and
sometimes barely related at all.

Unity ships a merge tool for these files, and it is much better than a line
merge. Configure it. A three-way text merge on a scene file produces something
that parses and is nonsense.

## Why this breaks diff-scoped code review

This is the part that matters for tooling. A reviewer that works on the diff
alone, whether human or model, is given a set of changed lines and asked whether
they are correct. On a Unity change that assumption fails in three ways.

The diff is dominated by data. A change touching a handful of C# lines can carry
thousands of lines of serialised scene churn alongside it. By volume the real
change is a rounding error, and anything selecting by size or truncating to fit
a budget will discard exactly the wrong part.

The meaningful change is often not in the diff at all. A GUID reference moving
from one object to another is one number changing. Nothing in the changed lines
explains what that number is, and the file that would explain it is not part of
the diff.

The text is not written for a reader. A reviewer that tries to reason about
scene YAML line by line will confidently produce commentary about numbers whose
meaning it cannot see.

The conclusion I have landed on is that Unity data files need to be classified
and handled deliberately rather than fed to a reviewer as though they were
source. What survives that filter is C#, and C# review works about as well as
it does anywhere else.
