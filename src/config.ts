import { cosmiconfigSync } from "cosmiconfig";
import { TypeScriptLoader } from "cosmiconfig-typescript-loader";
import { program } from "./prompts";
import { BASE_DIR } from "./constans";
import { defaultConfig, ReloaderConfig } from "./default";

const moduleName = "reloader";

const programOpts = program.opts();

const configFile = programOpts.config || null;

const explorer = cosmiconfigSync(moduleName, {
  searchPlaces: [
    "package.json",
    `.${moduleName}rc`,
    `.${moduleName}rc.json`,
    `.${moduleName}rc.yaml`,
    `.${moduleName}rc.yml`,
    `.${moduleName}rc.js`,
    `.${moduleName}rc.ts`,
    `.${moduleName}rc.cjs`,
    `${moduleName}.config.js`,
    `${moduleName}.config.ts`,
    `${moduleName}.config.cjs`,
  ].concat(configFile ? [configFile] : []),
  loaders: {
    ".ts": TypeScriptLoader(),
  },
});

const searchedFor = explorer.search(BASE_DIR);

export const config: ReloaderConfig = {
  ...defaultConfig,
  ...searchedFor?.config,
  ...programOpts,
};
