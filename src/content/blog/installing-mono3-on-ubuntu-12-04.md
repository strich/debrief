---
title: "Installing Mono3 on Ubuntu 12.04"
pubDate: 2014-08-18T22:37:08Z
originalPath: "/installing-mono3-on-ubuntu-12-04/"
tags: [infrastructure]
draft: false
---
Unfortunately Ubuntu 12.04 does not have any packages for Mono3, so we must compile and build it ourselves. Below are the instructions on how to do so. This article is a slightly modified version from [Lovesmesomecode.com](http://www.lovesmesomecode.com/post/20130719-compiling-mono-3-in-ubuntu/).

## Installing Dependencies

First, we need to install all the dependencies we will need.

```bash
sudo apt-get install git autoconf automake libtool g++ gettext mono-gmcs
sudo apt-get install libglib2.0-dev libpng12-dev libx11-dev
sudo apt-get install libfreetype6-dev libfontconfig1-dev libcairo2-dev
sudo apt-get install libtiff4-dev libjpeg8-dev libgif-dev libexif-dev
```

## Cloning source code repositories

Now, lets get all the code we will need. The Mono project has all of their source code on their GitHub account. You want to create a folder in /opt or your home folder to contain your working source code repositories. Clone the repositories while inside this folder.

```bash
git clone git://github.com/mono/mono.git
```

libgdiplus is needed by Mono:

```bash
git clone git://github.com/mono/libgdiplus.git
```

## Compiling libgdiplus

Navigate to the root folder of the **libgdiplus** repository you cloned previously, and then run the following commands.

```bash
./autogen.sh --prefix=/usr/local
```

This will configure the compilation process and ensure your computer has all the proper libraries and dependencies installed. If you ran everything above, you should be good to go. If it fails on an error and indicates you are missing a libary or package, you may need to install a development version of that package, and then try to run the command again.
Once this completes successfully and you see the words Now type 'make' to compile, you can run the following commands.

```bash
make
sudo make install-strip
```

make will compile the package, and sudo make install will install it into your system.

## Compiling Mono

First you need to get all the submodules for Mono:

```bash
git submodule init
git submodule update --recursive
```

Now navigate to the directory where you cloned the Mono source code. Run the compilation setup script similar to the previous step.

```bash
./autogen.sh --prefix=/usr/local
```

Once this completes successfully and you should again see the words Now type 'make' to compile. This article assumes you do not already have Mono installed. You must first make monolite, which is then used to build the full Mono.

```bash
make get-monolite-latest
```

Now you can build Mono:

```bash
make EXTERNAL_MCS=${PWD}/mcs/class/lib/monolite/gmcs.exe
```

If you already have a working Mono installation, or you want to update it you can just run regular make without having to build monolite.
Now you can install it:

```bash
sudo make install
```

You can optionally run make check to run the mono and mcs test suites.
That’s it! You should now have a working Mono installation on your system. You can now run:
**mono -V**
You should see some information on Mono and the version number. As of the time of this writing, that is 3.8.1.
