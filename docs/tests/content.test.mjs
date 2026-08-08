import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { test } from "node:test";

const readJson = async (file) => JSON.parse(await readFile(new URL(file, import.meta.url), "utf8"));

test("Spanish and English expose the same translation keys", async () => {
  const [es, en] = await Promise.all([
    readJson("../src/i18n/messages/namespaces/common/es.json"),
    readJson("../src/i18n/messages/namespaces/common/en.json"),
  ]);
  assert.deepEqual(Object.keys(es).sort(), Object.keys(en).sort());
});

test("every published case exists in both locales", () => {
  const ids = ["cpces-odoo", "cenesa-web", "cenesa-intranet", "burgos1950-odoo"];
  for (const locale of ["es", "en"]) {
    for (const id of ids) {
      assert.equal(existsSync(new URL(`../src/content/projects/${locale}/${id}.ts`, import.meta.url)), true);
    }
  }
});

test("GitHub Pages fallback is present", () => {
  assert.equal(existsSync(new URL("../public/404.html", import.meta.url)), true);
});

test("skills icon sprite is bundled locally", () => {
  assert.equal(existsSync(new URL("../public/static/media/skills.svg", import.meta.url)), true);
});
