---
title: "Repo hygiene and layout"
status: working
---

Most version control pain on a game team is not conceptual. It is repetitive.
And repetitive friction is the thing people quietly stop doing, which is how you
end up with three weeks of uncommitted work on somebody's machine.

## Make the routine path one command

The daily sequence on a busy team is roughly stash, pull with rebase, push,
restore. Four commands, several times a day, each with a failure mode. Nobody
gets it wrong because they are careless. They get it wrong because it is dull.

I wrapped ours into a single `git sync` alias in 2018 and it is still the
pattern I reach for. The write-up is in
[Using git-sync to automate common Git commands](/blog/using-git-sync-to-automate-common-git-commands),
and the project page is [git-sync](/projects/git-sync).

The general principle matters more than that specific script. If a sequence is
run a dozen times a day, it should be one command, and that command should fail
loudly rather than half-completing.

## Keep the ignore rules tight

A Unity project generates a great deal of derived output. `Library`, `Temp`,
`obj`, `Build`, and the various IDE folders are all reproducible from source and
none of them belong in history. Getting this wrong early is expensive, because
removing them later is a history rewrite.

The counterpart rule is that `.meta` files are never ignored. See
[Unity serialization](/handbook/version-control/unity-serialization/) for why a
missing `.meta` is worse than a missing asset.

## Decide what is source and what is output

The most useful question for any file is whether it can be regenerated. If it
can, it does not belong in the repository, and the thing it is generated from
does.

This gets genuinely difficult with art assets, where the master file is often
much larger than the export and lives in a format only one person's tool can
open. There is no clean answer. The working compromise here has been to version
the master where the export is cheap to regenerate, and to version both where
regenerating requires a specific artist and a specific plugin version.

## Branching

Keep it boring. The model matters much less than whether everyone actually
follows it, and elaborate models lose that contest reliably.

Small teams shipping quickly often do better working close to a shared branch
with short-lived topic branches over it, rather than the full long-lived release
branch structure. That is the opposite of what most guidance says. It is what
has worked here, on a team where five people commit to the same area all day.
