---
title: "Using 'git sync' to automate common Git commands"
pubDate: 2018-03-16T05:13:29Z
originalPath: "/using-git-sync-to-automate-common-git-commands/"
tags: [git, tooling]
draft: false
---
At Brightrock Games about 5 of us actively use Git hourly to commit and pull work all day from the same branch. Doing this often means that every time you want to do a git pull or push, there are several manual steps you have to take to stash any outstanding changes you haven't yet got around to committing (Or any unnecessary trash Unity makes) so you can then pull rebase if there is something upstream then finally push. Its an annoyance that wastes a few minutes every few hours.
Git best practices will suggest that each developer works in their own branch until they're ready to merge, but in practice when the whole team is rapidly pumping out bug fixes and improvements its just easier to be working together.
To improve our workflow I have created a git alias that performs a git stash -> git pull --rebase -> git push -> git unstash called git sync.
[![](/assets/blog/using-git-sync-to-automate-common-git-commands/powershell_2018-03-15_18-02-01.png)](/assets/blog/using-git-sync-to-automate-common-git-commands/powershell_2018-03-15_18-02-01.png)
On a command-line paste in the following to create a global git alias:

```bash
git config --global alias.sync '!f() { bold=$(tput bold); normal=$(tput sgr0); changes=false; if [[ `git status --porcelain` ]]; then changes=true; echo \"${bold}Changes detected, stashing...${normal}\"; git stash save --include-untracked; else echo \"${bold}No local changes, skipping stash${normal}\"; fi; echo \"${bold}Rebasing and pushing...${normal}\"; git pull --rebase && git push; if [ \"$changes\" = true ] ; then echo \"${bold}Unstashing changes...${normal}\"; git stash pop --quiet; fi; }; f'
```

That's it.

For reference here is the non-minified script code:

```bash
bold=$(tput bold);
normal=$(tput sgr0);
changes=false;

if [[ `git status --porcelain` ]]; then
  changes=true;
  echo "${bold}Changes detected, stashing...${normal}";
  git stash save --include-untracked;
else
  echo "${bold}No local changes, skipping stash${normal}";
fi;

echo "${bold}Rebasing and pushing...${normal}";
git pull --rebase && git push;

if [ "$changes" = true ] ; then
  echo "${bold}Unstashing changes...${normal}";
  git stash pop --quiet;
fi;
```
