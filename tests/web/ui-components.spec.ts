import { expect, test } from "@playwright/test";
import { HomePage } from "../../pageobject/HomePage";

test.describe("UI Components Tests", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test("should verify page title and heading hierarchy", async ({ page }) => {
    await expect(page).toHaveTitle(/QA Automation Labs|Tools Demo/);
    await expect(homePage.homeElements.homePageTitle).toBeVisible();
    await expect(homePage.homeElements.homePageTitle).toHaveText(/Tools Demo/);
  });

  test("should verify logo properties", async () => {
    const logo = homePage.homeElements.pageLogo;

    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute("alt", "QA Automation Labs");
    await expect(logo).toBeEnabled();
  });

  test("should verify footer content", async () => {
    if (await homePage.homeElements.footerText.isVisible()) {
      await expect(homePage.homeElements.footerText).toBeVisible();
      await homePage.homeElements.footerText.scrollIntoViewIfNeeded();

      const footerText = await homePage.homeElements.footerText.textContent();
      expect(footerText).toBeTruthy();
    }
  });

  test("should verify main content area", async () => {
    if (await homePage.homeElements.mainContent.isVisible()) {
      await expect(homePage.homeElements.mainContent).toBeVisible();

      const mainText = await homePage.homeElements.mainContent.textContent();
      expect(mainText).toBeTruthy();
      expect(mainText!.length).toBeGreaterThan(0);
    }
  });

  test("should handle hover interactions", async ({ page }) => {
    await homePage.homeElements.pageLogo.hover();
    // Wait for a hover effect: e.g., a class or style change. Replace selector/property as appropriate.
    // Example: await expect(homePage.homeElements.pageLogo).toHaveClass(/hover/);
    await expect(homePage.homeElements.pageLogo).toBeVisible();
  });

  test("should verify search functionality if available", async () => {
    const searchBox = homePage.homeElements.searchBox;

    if (await searchBox.isVisible()) {
      await expect(searchBox).toBeEditable();
      await searchBox.fill("test search");
      await expect(searchBox).toHaveValue("test search");
      await searchBox.clear();
      await expect(searchBox).toHaveValue("");
    }
  });

  test("should verify contact button if available", async () => {
    const contactButton = homePage.homeElements.contactButton;

    if (await contactButton.isVisible()) {
      await expect(contactButton).toBeVisible();
      await expect(contactButton).toBeEnabled();

      const href = await contactButton.getAttribute("href");
      expect(href).toBeTruthy();
    }
  });

  test("should verify keyboard navigation", async ({ page }) => {
    await homePage.homeElements.pageLogo.focus();

    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

    const focusedElement = await page.evaluate(
      () => document.activeElement?.tagName,
    );
    expect(focusedElement).toBeTruthy();
  });

  test("should not have JavaScript errors", async ({ page }) => {
    const errors: string[] = [];

    page.on("pageerror", (error) => {
      errors.push(error.message);
    });

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await homePage.navigate();

    await page.waitForLoadState('networkidle');

    const criticalErrors = errors.filter(
      (error) =>
        !error.includes("favicon") &&
        !error.includes("google-analytics") &&
        !error.includes("gtag"),
    );

    expect(criticalErrors).toHaveLength(0);
  });
});
