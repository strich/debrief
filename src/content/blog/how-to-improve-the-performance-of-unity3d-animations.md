---
title: "How to Improve the Performance of Unity3D Animations"
pubDate: 2015-09-21T21:08:32Z
originalPath: "/how-to-improve-the-performance-of-unity3d-animations/"
draft: false
---
In our game [War for the Overworld](http://www.wftogame.com) we make pretty heavy use of animations with users being able to potentially see 25-100 units on screen at once. This means that the Animation Renderer takes up a considerable part of our frame time, and as such any tuning there can create a noticeable performance improvement. Recently I decided to take another look and found what I think is a lesser known Unity feature - *Optimize Transform Hierarchy*. Using this feature reduced our Animation Renderer overhead by **50%**!
[![2015-09-21 11_46_14-](/assets/blog/how-to-improve-the-performance-of-unity3d-animations/2015-09-21-11_46_14-.png)](/assets/blog/how-to-improve-the-performance-of-unity3d-animations/2015-09-21-11_46_14-.png)
Executing this feature on an animated prefab will cause it to remove all those empty bone Game Objects.
Why might you want to do this? Because it costs precious time for Unity to move those Game Objects along with the actual animations. It does not affect the animations themselves. But do note that this will mean you cannot attach arbitrary child objects to your model - For example a weapon to its hand and have it correctly follow the animation. Also be aware that it will delete any Game Objects you might have put somewhere into the bone hierarchy. This can be solved with a bit of work, however.

### Option 1 - Set everything up manually again

Often you'll want at least some of the bone Game Objects available for use, such as the hands and head. You can manually dictate what bones Unity will create a Game Object for in the [Rig tab for the model](file:///C:/Program%20Files/Unity/Editor/Data/Documentation/en/Manual/FBXImporter-Rig.html) importer.
[![2015-09-21 11_59_00-Skype™ [1] - scott@strichnet.com](/assets/blog/how-to-improve-the-performance-of-unity3d-animations/2015-09-21-11_59_00-skype-1-scott-strichnet-com.png)](/assets/blog/how-to-improve-the-performance-of-unity3d-animations/2015-09-21-11_59_00-skype-1-scott-strichnet-com.png)
Note that this wont automatically update the model prefab if you've already made one, so you'll need to recreate the prefab with the new mesh.

### Option 2 - Use a script to automate it!

We have some 70 units in our game, so manually updating all the prefabs was a going to be a bad idea. I created a Unity Editor script that takes a set of prefabs to be consumed. It will search each prefab for a Skinned Mesh, flag any bones that contain a custom Game Object, add them as bones that need to stay, then finally it will optimize the mesh. It worked on our messy unit prefabs so hopefully it'll be fine for you too, however it might not cover all edge cases so make sure you double check everything is good afterwards.
