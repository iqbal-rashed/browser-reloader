import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import chokidar from "chokidar";
import { ReloaderConfig } from "./default";
import { debounce as rawDebounce } from "./utils";
import { config as pConf } from "./config";

export function reloader(conf?: Partial<ReloaderConfig>) {
  const config: ReloaderConfig = {
    ...pConf,
    ...conf,
    ignore: [...pConf.ignore].concat(conf?.ignore || []),
  };
  const app = express();
  const server = http.createServer(app);
  const wss = new WebSocketServer({ server });

  const watcher = chokidar.watch(config.watch, {
    ignored: config.ignore,
    ignoreInitial: true,
  });

  const debounce = (fn: () => void) => rawDebounce(fn, config.debounce);

  const broadcastReload = debounce(() => {
    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send("reload");
      }
    });

    if (!config.quiet) {
      console.log("🔁 Reload broadcast sent to clients.");
    }
  });

  watcher.on("change", (filePath) => {
    if (!config.quiet) {
      console.log(`📁 File changed: ${filePath}`);
    }
    broadcastReload();
  });

  app.get("/reloader.js", (req, res) => {
    const script = `      
        try {
          const rh = new URL(
            Array.from(document.scripts).find((s) => s.src.includes("reloader.js"))
            ?.src || ""
          );
          const ws = new WebSocket("ws://" + rh?.host);
          ws.onmessage = ({ data }) => {
            if (data === "reload") location.reload();
            };
        } catch {
          console.log("Reloader initialize failed");
        }

      `;
    res.setHeader("Content-Type", "application/javascript");
    res.writeHead(200);
    res.end(script);
  });

  const PORT = 43878;
  server.listen(PORT, () => {
    if (!config.quiet) {
      console.log(`Reloader server running at http://localhost:${PORT}`);
    }
  });
}
