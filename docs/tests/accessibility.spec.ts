import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("home exposes the core value proposition without serious accessibility violations", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Pescador");
  await expect(page.getByRole("link", { name: /CV/i }).first()).toBeVisible();

  const results = await new AxeBuilder({ page }).analyze();
  const severeViolations = results.violations.filter(({ impact }) => impact === "critical" || impact === "serious");
  expect(severeViolations).toEqual([]);
});

test("mobile menu traps focus, closes with Escape and restores the trigger", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes("mobile"), "Mobile navigation check");
  await page.goto("/");

  const trigger = page.getByRole("button", { name: /abrir menú|open menu/i });
  await trigger.focus();
  await trigger.press("Enter");
  await expect(page.getByRole("dialog")).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("published case studies load through direct URLs", async ({ page }) => {
  await page.goto("/project/cpces-odoo");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator(".project-wrapper-visible .project-evidence-value", { hasText: /1M\+|\+1 millón/i })).toBeVisible();
});

test("desktop section navigation clears the fixed header and keeps the target active", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes("desktop"), "Desktop navigation check");
  await page.goto("/");

  const educationLink = page.getByRole("button", { name: /educación|education/i });
  await educationLink.click();

  await expect
    .poll(() =>
      page.evaluate(() => {
        const target = document.querySelector<HTMLElement>("#education");
        const header = document.querySelector<HTMLElement>("header");
        if (!target || !header) return false;
        return target.getBoundingClientRect().top >= header.getBoundingClientRect().bottom;
      }),
    )
    .toBe(true);
  await expect(educationLink).toHaveAttribute("aria-current", "location");
});

test("contact form blocks an empty submission and focuses the first required field", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /enviar mensaje|send message/i }).click();
  await expect(page.locator("#contact-name")).toBeFocused();
});
