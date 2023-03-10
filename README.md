<br>
<p align="center">
  <img width="150" src="https://raw.githubusercontent.com/iqbal-rashed/browser-reloader/main/images/logo.png">
</p>
<h1 align="center"> Browser Reloader </h1>
<p align="center">
  <b >An Awesome CLI tool to reload browser on every code change</b>
</p>

<br>

## Description
Browser Reloader is a CLI tool that automatically reloads your browser when you make changes to your code. It's particularly useful for web development projects that use template engines. The tool uses chokidar to watch directories for changes, and socket.io to communicate with the browser.



Features:

* Reload your browser on every code change.
* Watch multiple directories and reload multiple hosts.
* Reload another computer's browser with this tool (the other computer must be connected to the same network).



## Installation: Command Line Tools
You can install Browser Reloader locally or globally using npm.

Locally:
```bash
npm i browser-reloader
```

Globally:
```bash
npm i -g browser-reloader
```

## Installation: Connect Wtih Browser

There are two method to connect with browser.

### 1. Method: Extension
To install, download and unzip the extension, open `chrome://extensions/`, check the "Developer mode" box, and use "Load unpacked" extension on the directory containing your downloaded folder.

Manifest V2 (Recommended): [Download](https://github.com/iqbal-rashed/browser-reloader/releases/download/initial-release/manifest_v2.zip)

Manifest V3: [Download](https://github.com/iqbal-rashed/browser-reloader/releases/download/initial-release/manifest_v3.zip)

Firefox Addons: [Get Extension](https://addons.mozilla.org/en-US/firefox/addon/browser-reloader/)


### 2. Method: Script Tag

Add this script tag into your project. If you want to reload both (locally and remotely) browser just add remote wi-fi script tag.

Locally:
```bash
<script src="http://localhost:64356/reloader.js"></script>
```

Remote Wi-Fi:
```bash
<script src="http://{IPv4 Address}:64356/reloader.js"></script>
```



## How to use

### Start Reloader: CLI
To start Browser Reloader from the command line, use the following options:
```bash
$ reloader --help

Options:
  -w, --watch [type...]  To watch directory, you can watch multiple directories 
  -h, --host [type...]   For reload host, also reload multiple hosts 
  -p, --port [type]      For port 
  --help                 display help for command
```

### Examples
Here are some examples of how to use these options:

- Watch all directories and reload localhost (default):
```bash
$ reloader 
```
- Watch the public and views directories and reload localhost:
```bash
$ reloader -w public views
```
- Watches CSS inside the public folder, views directories, and reload all localhost:
```bash
$ reloader -w public/css views
```
- Watches public and views directories and reload localhost:4000:
```bash
$ reloader -w public views -p 4000
```
- Watches public and views directories and reload {IPv4 Address}:4000 (if you want to reload another PC or Android browser, use this option):
```bash
$ reloader -w public views -p 4000 -h {IPv4 Address}
```
- Watches public and views directories and reload {IPv4 Address}:4000, localhost:4000 (if you want to reload both the current PC browser and another PC or Android browser, use this option):
```bash
$ reloader -w public views -p 4000 -h {IPv4 Address} localhost
```
- Watches public and views directories and reload {IPv4 Address}:4000, localhost:4000 (if you want to reload multiple ports, use this option):
```bash
$ reloader -w public views -h localhost:3000 localhost:4000
```



If you want to reload your current browser then do nothing just install browser extension.If you want to reload remote browser through local wifi then switch local to wifi, input Ipv4 address then press connect.

## Contribution
If you want to contribute or report any bug, you welcome
<br>
 Don't forget to give a star😍