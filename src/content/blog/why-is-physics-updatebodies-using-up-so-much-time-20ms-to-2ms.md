---
title: "Why is Physics.UpdateBodies using up so much time? 20ms to 2ms"
pubDate: 2016-07-02T03:54:05Z
originalPath: "/why-is-physics-updatebodies-using-up-so-much-time-20ms-to-2ms/"
draft: false
---
As part of performing some initial prototyping and load testing for our next game we had to determine how to implement the physics system. For our game we required a dynamic world and the ability to simulate 100-500 agents. That kind of target is right on the edge of needing to write a bespoke system so as to take every advantage one can to meet a 60 FPS minimum. We're long-time Unity3D devs and were quite wary of its implementation of PhysX, but we had to try it anyway - The tooling and maintenance bonuses of using it would be of great value let alone not having to write our own implementation.
Our test consisted of a single large floor collider and the "*Unity Guy - Ethan*" rigged model and animation assets (Rigidbody + Capsule Collider components), with a simple script that has him run around a couple of rally points. No pathfinding. We would spawn 500 of these agents and see what the frame times look like with them all within the camera frustum and, more importantly here, when they're outside of the camera frustum.
There were a whole bunch of small optimizations we tweaked and played with, however there was one striking issue that really stumped us:
[![2016-07-01 18_40_29-](/assets/blog/why-is-physics-updatebodies-using-up-so-much-time-20ms-to-2ms/2016-07-01-18_40_29-.png)](/assets/blog/why-is-physics-updatebodies-using-up-so-much-time-20ms-to-2ms/2016-07-01-18_40_29-.png)
What the fuck? 20ms?! Wow Unity's physics system is **SO. SHIT**!
Actually. It's not. It took the better part of a day and a Unity Dev to explain in way too few words what this magical Physics.UpdateBodies method was:
> *"it's sending all the transform update messages*."

Huh. Okay. So after digging around for a bit it turns out the problem is this: For whatever reason, this method deals with sending back the transform updates of every transform under a Rigidbody. The model we were testing with has, as with all imported rigged models, its default skeleton structure laid out in 20-30 empty GameObjects. It's a well known optimization that one must trim these as much as possible and it's something we would do when we got around to really implementing animated characters. However it seems quite insane for it to impact Physics.
In either case the solution is simple - Remove the dead transforms ([You can read about optimizing rigged models here](/blog/how-to-improve-the-performance-of-unity3d-animations/)) and...
[![2016-07-01 18_48_49-](/assets/blog/why-is-physics-updatebodies-using-up-so-much-time-20ms-to-2ms/2016-07-01-18_48_49-.png)](/assets/blog/why-is-physics-updatebodies-using-up-so-much-time-20ms-to-2ms/2016-07-01-18_48_49-.png)
20ms to 2ms. Crazy. Simulating 500 or even 1000 active agents is actually possible right now. I wonder how many Unity developers dump the physics system without realizing this optimization.
