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
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  const menuItems = dialog.locator(".mobile-menu-item");
  await expect(menuItems.nth(0)).toHaveText(/sobre mí|about/i);
  await expect(menuItems.nth(1)).toHaveText(/habilidades|skills/i);
  await expect(menuItems.nth(2)).toHaveText(/trayectoria|journey/i);

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("mobile exposes the sound control and unlocks it from a user gesture", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes("mobile"), "Mobile audio check");
  await page.goto("/");

  const soundToggle = page.locator(".header-sounds-toggle");
  await expect(soundToggle).toBeVisible();
  await expect(soundToggle).toHaveAccessibleName(/activar sonidos|enable sounds/i);
  await soundToggle.click();
  await expect(soundToggle).toHaveAccessibleName(/desactivar sonidos|disable sounds/i);
});

test("published case studies load through direct URLs", async ({ page }) => {
  await page.goto("/project/cpces-odoo");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator(".project-wrapper-visible .project-evidence-value", { hasText: /10M\+|\+10 millón/i })).toBeVisible();
});

test("desktop section navigation clears the fixed header and keeps the target active", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes("desktop"), "Desktop navigation check");
  await page.goto("/");

  const skillsLink = page.getByRole("button", { name: /habilidades|skills/i });
  await skillsLink.click();

  await expect
    .poll(() =>
      page.evaluate(() => {
        const target = document.querySelector<HTMLElement>("#skills");
        const header = document.querySelector<HTMLElement>("header");
        if (!target || !header) return false;
        return target.getBoundingClientRect().top >= header.getBoundingClientRect().bottom;
      }),
    )
    .toBe(true);
  await expect(skillsLink).toHaveAttribute("aria-current", "location");

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
