---
title: "Tuning Git for large binary repositories"
pubDate: 2014-12-14T13:37:45Z
originalPath: "/tuning-git-for-large-binary-repositories/"
tags: [git, performance]
draft: false
---
Git isn't particularly well suited for video game repositories where you want to version binary files such as art assets and at some point it will start to crack at the seams. Currently there is no 64bit Git build for Windows and at some point your repository will begin to crash with Out of Memory exceptions when performing heavy tasks such as Git GC.
Until a 64bit build is released for Windows one can make the following changes to ensure Git doesn't hit the 32bit memory limit.
In **.git/config** add the following:

```ini
[core]
  packedGitLimit = 512m
  packedGitWindowSize = 512m
  bigFileThreshold = 256m
[pack]
  deltaCacheSize = 256m
  windowMemory = 256m
  threads = 4
```

In **.git/info/gitattributes** we will set a number of file extensions to binary and remove the delta diff functionality from them:

```text
*.jpg binary -delta
*.ogg binary -delta
*.png binary -delta
```
