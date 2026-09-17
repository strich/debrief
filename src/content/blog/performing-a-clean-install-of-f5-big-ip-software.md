---
title: "Performing a Clean Install of F5 BIG-IP software"
pubDate: 2013-08-02T12:56:46Z
originalPath: "/performing-a-clean-install-of-f5-big-ip-software/"
tags: [infrastructure]
draft: false
---
I was recently tasked with replacing a dead F5 BIG-IP 1600 at our datacenter. A seemingly typical piece of work, however I ran into some huge issues in the process of doing so largely due to the replacement F5 device coming with an early version of the OS at v9.4.6 - F5 switched from a partition-based storage framework to an LVM Volume-based storage framework in the transition between v9.x and v10.x as well as quite heavily changing the OS upgrade process (For the better).
What this means in practice is that it is quite a complicated process to upgrade from v9.x -> v10.x -> v11.x. The guides F5 provide to perform this span a number of knowledgebase articles and it can be fairly complicated to follow properly, and missing one step could mean wiping and bricking the F5.
Additionally, the official F5 guides on performing a clean install of an OS Image requires either a linux PC or a pre-existing and working F5 to create the requisite bootable media to install from.
In this article I present a simple and effective way to upgrade from any version of OS straight to the latest v11.x OS, from any PC (Windows, Linux or Mac).

Note that this approach is considered a *clean install* - Meaning the entire device is wiped including its license and configuration files. You can backup these during the process but I won't be detailing it here.

# Required Software

You will need the following software to perform the clean install:

- The F5 BIG-IP OS Image (.iso) you intend to install.
- [UNetbootin](http://unetbootin.sourceforge.net/) - We will use this application to create the bootable USB drive from the OS Image.
- A USB drive - Needs to be >2GB in size.
- Physical access to the F5 and a Console connection.

# Creating the bootable USB drive

1. Plug in the USB drive to the PC you have installed UNetbootin on to.
2. Format the USB drive as FAT32.
3. Look at the UNetbootin website guide for detailed instructions, however at a high level:
   - In UNetbootin, select the USB drive you intend to boot from.
   - Select the F5 OS Image you downloaded.
   - Hit Go!
4. Done!

# Installing the new OS on the F5 BIG-IP

1. Connect a PC to the console port of the F5 and plug in the USB drive.
2. Turn the F5 on and let it automatically boot into the Maintainance Operating System (MOS) from the USB drive.
3. You will be asked what terminal emulation you'd like - Pick the default (vt100).
4. You will be asked if you want to proceed with the auto-install, and if you wish to you can and skip the rest of the steps below. However you should not proceed with auto-install if you want to recover any files before installing or need to tweak the installation method. If so, you can exit the auto-installer with **CTRL+C.**
5. If you have an existing installation and want to recover the license or configuration files you can do it at this stage of the process.
6. Initialize the F5 disk for volumes:
   *Note: This will format the F5 disks, wiping everything.*

   ```
   diskinit --style volumes
   ```
7. Perform the OS installation:

   ```
   image2disk --format=volumes --nosaveconfig --nosavelicense
   ```
8. Once the installation is completed you can remove the USB drive from the F5 and reboot the system.
9. Done! The first reboot may take longer than usual as it performs all the first-time initialization tasks.
