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
Save once reload everywhere. Browser Reloader helps you reload the browser when your code change. This tool use [chokidar](https://github.com/paulmillr/chokidar) for watching directories and [socket.io](https://github.com/socketio/socket.io) are used to communicate with the browser.

Features:

* You can reload browser on every code change.
* You can watch multiple directories and also reload multiple hosts.
* You can reload another computer browser with this tools (another computer must connect with the same network)
* Even you can reload android browser with this module (download firefox and install Browser Reloader extension)

Next features:

* Live reloading of CSS and JavaScript without doing a full page refresh.

## Installation: Command Line Tools

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
To install, clone the repository locally, open `chrome://extensions/`, check the "Developer mode" box, and use "Load unpacked" extension on the directory containing your clone.

Manifest V2 (Recommended)
<br>
[Visit repository](https://github.com/iqbal-rashed/browser-reloader-extension)

Manifest V3
<br>
[Visit repository](https://github.com/iqbal-rashed/reloader-extension-v3)

Firefox and Firefox android <br>
[Get Extension](https://addons.mozilla.org/en-US/firefox/addon/browser-reloader/)

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
```bash
$ reloader --help

Options:
  -w, --watch [type...]  To watch directory, you can watch multiple directories 
  -h, --host [type...]   For reload host, also reload multiple hosts 
  -p, --port [type]      For port 
  --help                 display help for command
```

### Example

`$ reloader` : default watches all directories and reload all localhost <br>

`$ reloader -w public views` : watches public ,views directories and reload all localhost <br>

`$ reloader -w public/css views` : watches css[inside public folder] ,views directories and reload all localhost <br>

`$ reloader -w public views -p 4000` : watches public ,views directories and reload localhost:4000 <br>

`$ reloader -w public views -p 4000 -h ip` : watches public ,views directories and reload {Ipv4 address}:4000 `Note`: if you want to reload another pc or android browser then use it <br>

`$ reloader -w public views -p 4000 -h ip localhost` : watches public ,views directories and reload {Ipv4 address}:4000, localhost:4000 `Note`: if you want to reload current pc browser and another pc or android browser then use it <br>
`Important Note`: ip command automatically detect your ipv4 address

`$ reloader -w public views -h localhost:3000 localhost:4000` : watches public ,views directories and reload {Ipv4 address}:4000, localhost:4000 `Note`: if you want to reload multiple port <br>

### Browser Extension
`Current Browser:` If you want to reload your current browser then do nothing just install browser extension.

`Remote Browser:` If you want to reload remote browser through local wifi then switch local to wifi, input Ipv4 address then press connect. see below <br>
![Alt Text](https://raw.githubusercontent.com/iqbal-rashed/browser-reloader/main/images/extension.gif)
<br>

## Contribution
If you want to contribute or report any bug, you welcome
<br>
<br>
 Sorry for my poor English. Don't forget to give a star