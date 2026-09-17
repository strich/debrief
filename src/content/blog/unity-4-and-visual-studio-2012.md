---
title: "Unity 4 and Visual Studio 2012"
pubDate: 2013-06-23T06:20:28Z
originalPath: "/unity-4-and-visual-studio-2012/"
tags: [unity, tooling]
draft: false
---
Unfortunately the Unity3D developers have not yet seen fit to setup Unity Editor to work with Visual Studio 2012 and so one has to do a little work to get it setup manually. Here is how to get it working.

1. Recently Microsoft bought and re-released the popular Unity3D plugin UnityVS. The now renamed Visual Studio Tools for Unity plugin smooths the connection between Unity and Visual Studio and even allows one to perform debugging too! [Download it here](http://unityvs.com/).
2. In Unity Editor go to **Edit->Preferences->External Tools** and In **External Script Editor** choose **Browse** from the drop down box.
3. Browse to and select *C:\Program Files (x86)\Microsoft Visual Studio 11.0\Common7\IDE\devenv.exe*.
4. The **External Script Editor** should automatically show your selected editor as Visual Studio 2012.

That's it! It *should*just work from that point on.
