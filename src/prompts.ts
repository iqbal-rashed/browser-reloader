import { Command, Option } from "commander";
import { defaultConfig } from "./default";

export const program = new Command();

program
  .name("reloader")
  .description(
    "Watch files and reload browsers on change based on ReloaderConfig"
  )
  .version("1.0.0")

  // watch directories
  .addOption(
    new Option(
      "-w, --watch <paths...>",
      "Files or directories to watch"
    ).default(defaultConfig.watch.slice())
  )

  // ignore patterns
  .addOption(
    new Option("-i, --ignore <patterns...>", "Glob patterns to ignore")
      .argParser((val, prev: string[]) => prev.concat(val))
      .default(defaultConfig.ignore.slice())
  )

  // debounce
  .addOption(
    new Option("-d, --debounce <ms>", "Debounce filesystem events (ms)")
      .argParser((val) => parseInt(val, 10))
      .default(defaultConfig.debounce)
  )

  // suppress non-error output
  .addOption(
    new Option("--quiet", "Suppress non-error output").default(
      defaultConfig.quiet
    )
  )
  .action(() => {
    import("./reloader").then(({ reloader }) => {
      reloader();
    });
  });
