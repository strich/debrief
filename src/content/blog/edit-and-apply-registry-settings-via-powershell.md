---
title: "Edit and Apply registry settings via PowerShell"
pubDate: 2014-03-04T12:11:02Z
originalPath: "/edit-and-apply-registry-settings-via-powershell/"
draft: false
---
The video game Diablo 3 is a great game, however due to its extremely vibrant and chaotic particle effects during fights it can become very difficult to see the mouse cursor.
So I've written a quick script for Windows users to turn on mouse cursor trails in Diablo 3. It will automatically disable the trails when you exit the game. I've found it helps \*a lot\* in being able to keep track of the cursor.
No need to download anything so no keyloggers or malware here. And it doesn't touch Diablo what-so-ever, so no chance of being banned.

## Instructions

1. Copy the script code below into a new Notepad file. Save it as *Mouse Cursor Changer.ps1*. You can save it to any location, but I suggest just putting it in to your Diablo folder just so its always there.

   ```
   ##############################################################################
   #                            Mouse Cursor Changer                            #
   #     Changes the mouse cursor properties on a per-application basis.        #
   # Author: Scott Richmond (www.strichnet.com)                                 #
   ##############################################################################
   # SETTINGS:
   $TrailsOnValue 			= 6 			# A value between 2 and 15
   $TrailsOffValue 		= 0 			# 0 will disable the cursor trails

   # Application shortcut TARGET example:
   #   powershell.exe -command "& 'C:\CHANGE ME!\Mouse Cursor Changer.ps1' " 'C:\CHANGE ME!\Diablo III.exe'
   ##############################################################################
   $SetMouseTrails = 0x005D

   # Signature for C# system call to Mouse properties:
   $CSharpSig = @'
   	[DllImport("user32.dll", EntryPoint = "SystemParametersInfo")]
   	public static extern bool SystemParametersInfo(
   	                 uint uiAction,
   	                 uint uiParam,
   	                 uint pvParam,
   	                 uint fWinIni);
   '@
   $CursorRefresh = Add-Type -MemberDefinition $CSharpSig -Name WinAPICall -Namespace SystemParamInfo -PassThru

   # Call the C# method to edit Mouse properties:
   # More info here: http://msdn.microsoft.com/en-us/library/ms724947(v=VS.85).aspx
   $CursorRefresh::SystemParametersInfo($SetMouseTrails, $TrailsOnValue, $null, 0)

   # Run the application:
   Start-Process -FilePath $args[0]+'-w -launch' -Wait

   # Disable the cursor trails:
   $CursorRefresh::SystemParametersInfo($SetMouseTrails, $TrailsOffValue, $null, 0)
   ```
2. Right-click Diablo3.exe and select **Create Shortcut**.
3. Right-click the new shortcut and select **Properties**.
4. In the **Target** field, paste in the following line replacing the directory paths with your own:

   ```
   powershell.exe -command "& 'C:\CHANGE ME!\Mouse Cursor Changer.ps1' " 'C:\CHANGE ME!\Diablo III.exe'
   ```
5. That's it! You can move the shortcut to your desktop or anywhere else.
