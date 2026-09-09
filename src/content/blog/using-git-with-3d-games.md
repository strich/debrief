---
title: "Using Git with 3D Games"
pubDate: 2013-11-06T11:21:56Z
originalPath: "/using-git-with-3d-games/"
draft: false
---
Git can work fine with 3D Games out of the box. However the main caveat here is that versioning large (>5MB) media files can be a problem over the long term as your commit history bloats. We have solved this potential issue in our projects by only versioning the binary asset when it is considered final. Our 3D artists use Dropbox to work on WIP assets, both for the reason above and because its **much** faster and simpler (Not many artists will actively want to use Git!).

### Git Workflow

Your git workflow is very much something you need to decide for yourself given your own experiences as a team and how you work together. However. I would strongly recommend the appropriately named **Git Flow** methodology [as described by the original author here](http://nvie.com/posts/a-successful-git-branching-model/).
I won't go into too much depth here on how the methodology works as the author describes it perfectly and in quite few words too so its easy to get through. I have been using with my team for awhile now and its the best workflow we've tried so far.

### Git GUI Client Application

This is really personal preference here as there are quite a few options in terms of Git GUI or whether to use a GUI at all. But I would like to suggest the free [SourceTree application](http://www.sourcetreeapp.com/) as it plugs in perfectly with the Git Flow extension. Read the [SourceTree tutorial here](http://blog.sourcetreeapp.com/2012/08/01/smart-branching-with-sourcetree-and-git-flow/) on implementing the Git Flow methodology in their application.

### Unity3D Ignore Folders

Place the following into a .gitignore file within your Unity project folder.

```ini
# =============== #
# Unity generated #
# =============== #
Temp/
Library/

# ===================================== #
# Visual Studio / MonoDevelop generated #
# ===================================== #
ExportedObj/
obj/
*.svd
*.userprefs
/*.csproj
*.pidb
*.suo
/*.sln
*.user
*.unityproj
*.booproj

# ============ #
# OS generated #
# ============ #
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
```

### Unity3D Settings

1. Switch to *Visible Meta Files* in **Edit → Project Settings → Editor → Version Control Mode**.
2. Switch to *Force Text* in **Edit → Project Settings → Editor → Asset Serialization Mode**.
3. Save the scene and project from File menu.
