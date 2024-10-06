import { plugin, type PluginBuilder } from "bun";

await plugin({
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
    build.module("rambda", () => {
      console.log("module load");
      return {
        exports: {},
        loader: "object"
      }
    })
  }
});

// resolve existing module
console.group("resolve")
import.meta.resolve("rambda");
console.groupEnd()

// import existing module
console.group("import")
await import("rambda");
console.groupEnd()

// resolve unknown extension module
console.group("resolve - unknown extension")
import.meta.resolve("rambda.ext");
console.groupEnd()

// import unknown extension module
console.group("import - unknown extension")
try {
  await import("rambda.ext");
}catch{}
console.groupEnd()
