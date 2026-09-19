---
title: AI code review for a Unity monorepo
description: A forked open-source PR review bot, made to work against a large Unity repo with org-restricted token permissions.
selected: true
fromDate: 2026-08
status: active
types:
  - tool
  - open-source
  - integration
stack:
  - Python
  - GitHub Actions
  - Unity
  - LLM APIs
handbookPages:
  - /handbook/ai-assisted-development/ai-code-review-unity/
---

Off-the-shelf AI review tools assume a repository that fits comfortably in a
context window, and a token that can read whatever it likes. A production Unity
repo is neither. It is large by design, most of its diff by volume is serialised
asset data rather than code, and on an organisation repo the personal access
token is scoped down deliberately.

This is a fork of an existing open-source reviewer with the changes needed to
survive those three facts.

The largest change is classification. Before anything is sent for review the
diff is split into source and data, and only source goes forward. That sounds
obvious and it is the difference between a reviewer that comments on scene YAML
and one that reviews C#. The reasoning is written up in
[Unity serialization](/handbook/version-control/unity-serialization/).

The second largest is permissions, which I did not expect. Most review tooling
assumes a token that can read the whole organisation and post freely. Making it
work inside a scoped-down token on an org repo took longer than anything to do
with models or prompts.

It runs on pull requests, it is advisory rather than a merge gate, and it stays
quiet most of the time. That last part is deliberate. A reviewer that comments
on everything gets muted within a week, and the whole argument for starting here
was that it had to be easy to ignore.

Its limit is the same classification that makes it work. Splitting the diff and
reviewing only the source means the reviewer never sees the half of a Unity
change that lives in a scene or a prefab, so the bugs it structurally cannot
catch are exactly the wiring ones. That half needs a resolved object graph
rather than a diff, and it is covered separately in
[agents in the scene hierarchy](/handbook/ai-assisted-development/agents-in-the-scene-hierarchy/).

The other thing it taught me transfers beyond pull requests. A second model
reading work it did not produce catches things the author cannot catch, because
it has not committed to the approach. That holds just as well before the code
exists as after it, which is why there is now a planning and review step in
front of agent work here as well as a reviewer behind it.
