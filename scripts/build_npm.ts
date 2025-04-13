import { build, emptyDir } from "@deno/dnt";

await emptyDir("./npm");

await build({
  entryPoints: ["./src/mod.ts",],
  outDir: "./npm",
  shims: {
    deno: true,
  },
  package: {
    // package.json properties
    name: Deno.args[0],
    version: Deno.args[1],
    description: "An ASCII encoding scheme with a base of 73 for binary data.",
    license: "MIT",
    homepage: "https://github.com/jacobhaap/ts-base73/#readme",
    repository: {
      type: "git",
      url: "git+https://gitlab.com/jacobhaap/ts-base73.git",
    },
    bugs: {
      url: "https://github.com/jacobhaap/ts-base73/issues",
    },
    author: {
        name: "Jacob V. B. Haap",
        url: "https://iacobus.xyz/"
    },
    keywords: [
        "base73",
        "base",
        "encoding",
        "decoding",
        "ASCII"
    ]
  },
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});
