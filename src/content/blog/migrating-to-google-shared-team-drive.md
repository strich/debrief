---
title: "Migrating to Google Shared/Team Drive"
pubDate: 2019-07-31T20:24:29Z
originalPath: "/migrating-to-google-shared-team-drive/"
draft: false
---
We recently needed to move about 500GB of data over 5 years from a ton of people we no longer work with into a Shared Drive as part of our Gsuite. This move is intended to give us more full control over ownership and management of files.

Unfortunately Google provides no way to migrate files and folders that aren't owned by you or anyone in your org (domain). IE if a file is owned by a \*@gmail.com address (even if it's mine!), I cannot move it to our Shared Drive under the \*@Brightrockgames.com domain.

The only way to achieve this migration is by copying all files and folders. But again, Google provides no way to do this. If you try to do this via the web interface you'll have to do it manually file by file. Google File Stream doesn't support creating or copying gdoc files and folders either.

So what now? We turn to code! The below Google Script will copy all files and folders into a target folder. If the file already exists it'll skip it.

Unfortunately it is still not perfect - [Google Scripts](https://script.google.com) have a bunch of quotas limiting them such as daily executions and total Drive operations allowed. So this script will have to be run repeatedly over possibly a week. But at least it should do it perfectly, eventually. :/

```
var _cache = CacheService.getUserCache();

function start() {
  var sourceFolder = "0B9icZteiWC_OXzhQbkgyNXVfaDQ";
  var targetFolder = "1DVsXFojkfURxj4yIR4VVpLQYP2b-T6xh";

  var source = DriveApp.getFolderById(sourceFolder);
  var target = DriveApp.getFolderById(targetFolder);

  copyFolder(source, target);
}

function copyFolder(source, target) {
  var cachedFolder = _cache.get(source.getId());
  if(cachedFolder != null) return;

  var folders = source.getFolders();
  var files   = source.getFiles();

  while(files.hasNext()) {
    var file = files.next();
    var fileName = file.getName();

    var existingFile = getFileByNameIn(fileName, target);

    if(existingFile == null) {
      try {
        file.makeCopy(fileName, target);
        console.log("Copied " + fileName + " file.");
      }
      catch(e) { console.log("FAILED to copy " + fileName + " file."); }
    }
  }

  while(folders.hasNext()) {
    var subFolder = folders.next();
    var folderName = subFolder.getName();

    var targetFolder = getFolderByNameIn(folderName, target);

    if(targetFolder == null) {
      var targetFolder = target.createFolder(folderName);
      console.log("Created " + folderName + " folder.");
    }
    copyFolder(subFolder, targetFolder);
  }

  _cache.put(source.getId(), "", 21600);
}

function getFileByNameIn(name, parentFolder) {
  var files = parentFolder.getFilesByName(name);

  if(files.hasNext()) return files.next();
  else return null;
}

function getFolderByNameIn(name, parentFolder) {
  var subfolders = parentFolder.getFoldersByName(name);

  if(subfolders.hasNext()) return subfolders.next();
  else return null;
}
```
