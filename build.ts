import { createPlugin } from "./plugin.ts";

const result = await Bun.build({
  entrypoints: ["./entry.ts"],
  outdir: "./dist",
  naming: "[name]-[hash]",
  target: "bun",
  plugins: [createPlugin()],
});
