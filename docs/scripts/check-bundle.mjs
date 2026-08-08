import assert from "node:assert/strict";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const limits = {
  totalJavaScript: 1_400_000,
  largestJavaScriptChunk: 800_000,
  totalCss: 220_000,
};

const walk = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(async (entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(file) : file;
  }))).flat();
};

const files = await walk(fileURLToPath(new URL("../dist", import.meta.url)));
const sizes = await Promise.all(files.map(async (file) => ({ file, size: (await stat(file)).size })));
const js = sizes.filter(({ file }) => file.endsWith(".js"));
const css = sizes.filter(({ file }) => file.endsWith(".css"));
const total = (items) => items.reduce((sum, item) => sum + item.size, 0);

assert.ok(total(js) <= limits.totalJavaScript, `JavaScript total exceeds ${limits.totalJavaScript} bytes`);
assert.ok(Math.max(...js.map(({ size }) => size), 0) <= limits.largestJavaScriptChunk, "A JavaScript chunk exceeds 800 KB");
assert.ok(total(css) <= limits.totalCss, `CSS total exceeds ${limits.totalCss} bytes`);

console.log(`Bundle budget passed: ${total(js)} B JS, ${total(css)} B CSS.`);
