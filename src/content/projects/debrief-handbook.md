---
title: The Debrief Handbook
description: A maintained reference for game-repo infrastructure and AI, written as the working notes settle rather than as finished documentation.
selected: true
fromDate: 2026-09
status: active
types:
  - open-source
stack:
  - Astro
  - Starlight
  - Markdown
url: https://strichnet.com/handbook/
code: https://github.com/strich/debrief
handbookPages:
  - /handbook/start-here/what-this-is/
---

Writing things up as blog posts has one structural problem. A post is true on
the day it is published and slowly stops being true afterwards, and there is no
honest way to fix that. Going back to edit a dated field report misrepresents
what actually happened.

So the handbook is the other half. Posts stay as they were written. The parts
that turn out to be generally true get a page here, and that page is maintained.

Every page carries a status, borrowed from the way Oxide handle their RFDs.
Researching means I am still working it out and the page says what I am trying
to find out. Working means there is real substance and I am still revising.
Settled means I have run it long enough to trust it. Pages also carry a
last-updated date taken from the file history, so a stale page cannot pretend
otherwise.

The constraint that keeps it useful is that only things actually in practice get
a page. When we stop doing something, the page either gets rewritten to describe
what replaced it or it goes, and the reasoning moves to a dated post. Staleness
is what kills this format, so the rules are aimed squarely at that.

Currently twenty-six pages across six sections, covering version control at
game-repo scale, the Unity toolchain, AI-assisted development, cost discipline,
build infrastructure, and the people side of adopting any of it.
