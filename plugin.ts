import { type BunPlugin, plugin, type PluginBuilder } from "bun";

export const createPlugin = (): BunPlugin => {
  return {
    name: "bun-test",
    target: "bun",
    setup(build: PluginBuilder): void | Promise<void> {
      build.onResolve({ filter: /.*/ }, async (args) => {
        console.log("resolve", args);
        return args
      });
      build.onLoad({ filter: /.*/ }, async (args) => {
        console.log("onload", args);
        return {
          contents: "console.log('Hello, world!')",
          loader: "ts",
        };
      });
    }
  }
}
