---
title: "Repo hygiene and layout"
status: working
---

Most version control pain on a game team comes from dull, repetitive stuff. And
repetitive friction is exactly what people quietly stop doing, which is how you
end up with three weeks of uncommitted work sitting on someone's machine.

## Make the daily routine one command

On a busy team the daily sequence is roughly stash, pull with rebase, push,
restore. Four commands, several times a day, and each one can fail. People
don't get it wrong because they're careless. They get it wrong because it's
boring.

In 2018 I wrapped ours into a single `git sync` alias and it's still what I
reach for. The write-up is
[Using git-sync to automate common Git commands](/blog/using-git-sync-to-automate-common-git-commands),
and the project page is [git-sync](/projects/git-sync).

The specific script matters less than the idea though. If something gets run a
dozen times a day it should be one command, and that command should fail loudly
instead of half finishing.

## Keep the ignore rules tight

A Unity project generates a lot of derived output. `Library`, `Temp`, `obj`,
`Build` and the various IDE folders can all be rebuilt from source and none of
them belong in history. Getting this wrong early is expensive, because removing
them later means a history rewrite.

The flip side is that `.meta` files are **never** ignored.
[Unity serialization](/handbook/version-control/unity-serialization/) covers why
a missing `.meta` is worse than a missing asset.

## Is it source or output?

The most useful question to ask of any file is whether it can be regenerated.
If it can, it doesn't belong in the repo, and whatever it's generated from does.

This gets genuinely hard with art. The master file is often way bigger than the
export, and it's in a format only one person's tools can open. There's no clean
answer. Our compromise has been to version the master where the export is cheap
to regenerate, and to version both where regenerating it needs a specific
artist with a specific plugin version.

## Branching

Keep it boring. The model matters much less than whether everyone actually
follows it, and elaborate models lose that contest every time.

Back in 2013 I was strongly recommending Git Flow. These days I think small
teams shipping fast do better working close to one shared branch with
short-lived topic branches off it, instead of the full long-lived release branch
setup. That's the opposite of a lot of the guidance out there, but it's what has
worked here with five people committing to the same area all day.
