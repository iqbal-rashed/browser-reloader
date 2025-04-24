export interface ReloaderConfig {
  /** Files or directories to watch */
  watch: string[];
  /** Glob patterns to ignore */
  ignore: string[];
  /** Debounce filesystem events (ms) */
  debounce: number;
  /** Enable verbose logging */
  quiet: boolean;
}

/**
 * Default configuration values.
 */
export const defaultConfig: ReloaderConfig = {
  watch: ["."],
  ignore: ["node_modules/**", ".git/**"],
  debounce: 300,
  quiet: false,
};
