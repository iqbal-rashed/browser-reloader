# 🔁 Browser Reloader v2 (Beta)

**Browser Reloader** is a lightweight, pluggable, and configuration-driven file watcher that automatically triggers browser reloads via WebSocket when changes are detected. Perfect for enhancing developer experience during local development workflows.

## ✨ Features

- 🔍 Watch files and directories for changes
- 🎯 Ignore specific glob patterns
- 🧘 Debounce rapid filesystem events
- 🔕 Quiet mode to suppress logs
- 🔄 Auto reload connected browsers via WebSocket
- ⚙️ Configuration via CLI or config file (`.reloaderrc`, `reloader.config.ts`, etc.)

> This is version 2 and currently in **Beta**. While the core features are stable.
> If you encounter any issues or have feature requests, please feel free to open an issue or contribute directly to the project.

## 🚀 Installation

```bash
npm install -D browser-reloader
```

Or globally:

```bash
npm install -g browser-reloader
```

## 🛠️ Usage

### CLI

```bash
reloader [options]
```

#### Options

| Flag              | Description                     | Default                          |
| ----------------- | ------------------------------- | -------------------------------- |
| `-w, --watch`     | Files or directories to watch   | `["."]`                          |
| `-i, --ignore`    | Glob patterns to ignore         | `["node_modules/**", ".git/**"]` |
| `-d, --debounce`  | Debounce filesystem events (ms) | `300`                            |
| `--quiet`         | Suppress non-error output       | `false`                          |
| `--config <path>` | Path to config file             | Auto-detected                    |

## 🧩 Configuration

You can use a dedicated config file such as `.reloaderrc.json`, `reloader.config.ts`, or add a `"reloader"` field in `package.json`.

### Example (reloader.config.js)

```js
module.exports = {
  watch: ["./src", "./public"],
  ignore: ["node_modules/**", ".git/**"],
  debounce: 500,
  quiet: false,
};
```

## 🧪 Sample Client Integration

Add the following to your HTML page:

Locally:

```html
<script src="http://localhost:43878/reloader.js"></script>
```

Remote Wi-Fi:

```html
<script src="http://{IPv4 Address}:43878/reloader.js"></script>
```

This will connect to the reloader WebSocket server and reload the page automatically when changes are detected.

## 🧠 How It Works

1. Uses `chokidar` to watch files.
2. On change, debounces and broadcasts a `"reload"` message via `ws`.
3. Client JavaScript listens to this and triggers `location.reload()`.

## 📦 Example Programmatic Usage

```ts
import { reloader } from "browser-reloader";

reloader({
  watch: ["./src"],
  ignore: ["**/*.log"],
  debounce: 400,
  quiet: true,
});
```

## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue on GitHub.
