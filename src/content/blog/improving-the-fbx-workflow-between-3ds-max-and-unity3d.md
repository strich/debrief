---
title: "Improving the FBX workflow between 3ds Max and Unity3D"
pubDate: 2016-07-15T03:28:40Z
originalPath: "/improving-the-fbx-workflow-between-3ds-max-and-unity3d/"
tags: [unity, graphics, tooling]
draft: false
---
As some of our artists swear by 3ds Max we must support it and ensure the workflow between it and Unity3D is as seemless as possible. Unfortunately even though 3ds Max and among the top few 3D modelling applications there are still some serious workflow issues with it. One of the common tasks one performs - Exporting 3D models to the FBX file format - is fraught with problems:

- 3ds Max uses Z-Up axis whilst Unity3D is Y-Up. The FBX Exporter doesn't do this properly and Unity3D detects this and adds a -90 transform rotation to the imported object.
- Before exporting each object, the artist must zero out the position so it doesn't import out of [0,0,0].

Having to do this for many objects can be extremely time consuming for the artist. We need something that can automate this! And batch this!
Thanks to a lot of work by Jos Balcaen I have been able to modify and improve his batch exporter to support a few Unity oddities.

[Download the MaxScript here.](/assets/blog/improving-the-fbx-workflow-between-3ds-max-and-unity3d/3dsMax_Batch_Exporter_Importer_v4.zip)

[![2016-07-14 18_30_04-Clipboard](/assets/blog/improving-the-fbx-workflow-between-3ds-max-and-unity3d/2016-07-14-18_30_04-Clipboard.png)](/assets/blog/improving-the-fbx-workflow-between-3ds-max-and-unity3d/2016-07-14-18_30_04-Clipboard.png)
