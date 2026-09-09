---
title: "Migrating your project to Git LFS"
pubDate: 2017-09-29T20:25:42Z
originalPath: "/migrating-your-project-to-git-lfs/"
draft: false
---
For the past 4 years we have been using Git as our repository for our game War for the Overworld. This includes 18,000+ commits totaling to a massive a 35GB repo. Its huge. So huge that our host, BitBucket, falls apart if one tries to clone the repo anew. I don't blame BitBucket for this - At some point after we joined them they added a 1GB repo size limit and have been gracious enough to not apply that restriction on us. Ultimately the problem lies with Git itself - It wasn't built to handle all the binary data we have thrown into it.
For the past few months I've been looking into migrating our giant repo into Git LFS and then pushed up to GitHub, our new home. This mission has been a lot more painful than I had imagined and so I am recording the steps I took to make it happen.

### Mirroring the repository

First thing we need to do is mirror the remote repository so we can perform the LFS migration before pushing back up to our new remote (GitHub). Doing this is quite simple:

```
git clone --mirror git@bitbucket.org:subtgames/war-for-the-overworld.git
```

4 hours later...we move on.

### Migrating to LFS

Okay. Now for the serious business and to explain a few things. What I'm doing here is a *deep migration* to LFS. What this means is that I am walking through every single commit in the entire Git history and replacing every single binary file I've identified with its LFS representation and uploading that file to our remote host. This kind of solution works best if you're also going to be pushing the resulting repo to a new location (Even on the same host). If you want to simply rewrite a few files into LFS for a pre-existing hosted repo then you may be best using the official [Git LFS Migrate tool and tutorial](https://github.com/git-lfs/git-lfs/wiki/Tutorial#migrating-existing-repository-data-to-lfs).
In this case we need to make use of some fairly dark magic made easy thanks to [this tool](https://github.com/bozaro/git-lfs-migrate). Once downloaded, it is run like so:

```
java -jar git-lfs-migrate.jar `
-s war-for-the-overworld.git `
-d converted/war-for-the-overworld.git `
-g https://USERNAME:PASSWORD@github.com/BrightrockGames/war-for-the-overworld.git `
--write-threads 16 `
"*.bmp" `
"*.FBX" `
"*.TTF" `
"*.PNG" `
"*.cubemap" `
"*.dylib" `
"*.exe" `
"*.eps" `
"*.exr" `
"*.gif" `
"*.jpeg" `
"*.jpg" `
"*.png" `
"*.psd" `
"*.svg" `
"*.tga" `
"*.tif" `
"*.mp3" `
"*.ogg" `
"*.wav" `
"*.aiff" `
"*.avi" `
"*.flv" `
"*.mov" `
"*.mp4" `
"*.mpg" `
"*.wmv" `
"*.ogv" `
"*.fbx" `
"*.obj" `
"*.rar" `
"*.zip" `
"*.bin" `
"*.pdb" `
"*.dds" `
"*.dll" `
"*.exr" `
"*.lxo" `
"*.otf" `
"*.pdf" `
"*.rns" `
"*.tga" `
"*.ttf"
```

-s is the folder of the mirror we downloaded in the previous step.
-d is a new folder where the new migrated mirror will go.
-g is the new remote host location. This is necessary because this tool begins uploading the new LFS files immediately during this process.
Couple of things to note:

- To Unity devs - I left out the \*.unity  file type as I found that we changed scenes very often and this created an overly large LFS store due to each change creating a new binary file. Unity scene files can also be diffable by Git, so despite their large file size I've found they are fine left in plain Git.
- This tool isn't perfect - If your repo is big enough and the process is long enough, the remote host (GitHub) will eventually kick you off your session and the tool will crash. In this case you need to delete the converted/war-for-the-overworld.git/objects/  folder and restart the migration process. Luckily the LFS files you've already uploaded will be skipped, so eventually it will complete! It took me *days* to do our repo.

This will kick-off the very long process of walking Git history, rewriting files and commits, and uploading the new LFS files to the remote LFS store. This does NOT migrate the repo itself to the new remote location though...

### Uploading to the remote host

The final part - Pushing to the remote host! This *should*be the easiest part, but it wasn't for us...
First things first, lets clean up the mirror before we push it:

```
cd converted/war-for-the-overworld.git/
git gc
```

Running a git gc  will cause git to remove any loose files and garbage as well as compress all the file blobs. This might take awhile...
Once done, you simply run the below command to upload it to the remote host:

```
git push --mirror https://USERNAME:PASSWORD@github.com/BrightrockGames/war-for-the-overworld.git
```

If your repo is <1GB in size, this should complete without much of an issue and you can walk away from this article.
If you're in my position, where the resultant repo is still fairly large (Ours is 2.5GB), then you're going to need to enlist the help of GitHub support to temporarily relax 2 key limits:

- GitHub has a 100MB total file size limit - We hit that with some of our old Unity scene files and I didn't want to put them into LFS as they're diffable plain text files, and doing so blew up the LFS store by a factor of 5.
- GitHub has a 1GB single-push limit - Since our repo is well over 1GB and that Git does not provide a way to push a mirror on multiple parts, we could not push our repo without being kicked-off by GitHub when we hit 1GB+ uploaded.

Thankfully GitHub support have been accommodating to us and have relaxed these limits for the purposes of getting the repo up there.

### Extras

- You can update an existing local mirror with git remote update .
