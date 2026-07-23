import { expect } from "@playwright/test";
import { test } from "playwright-opentelemetry/fixture";
import { HomePage } from "../../pages/HomePage";

test.describe.skip("UI Components Tests", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test("should verify footer content", async () => {
    await homePage.homeElements.footerText.scrollIntoViewIfNeeded();
    await expect(homePage.homeElements.footerText).toBeVisible();

    const footerText = await homePage.homeElements.footerText.textContent();
    expect(footerText).toBeTruthy();
  });

  test.skip("should verify main content area", async () => {
    await expect(homePage.homeElements.mainContent).toBeVisible();

    const mainText = await homePage.homeElements.mainContent.textContent();
    expect(mainText).toBeTruthy();
    expect(mainText!.length).toBeGreaterThan(0);
  });

  test("should handle hover interactions on logo", async () => {
    await homePage.homeElements.pageLogo.hover();
    await expect(homePage.homeElements.pageLogo).toBeVisible();
  });

  test.skip("should verify search functionality if available", async () => {
    const searchBox = homePage.homeElements.searchBox;
    await expect(searchBox).toBeEditable();
    await searchBox.fill("test search");
    await expect(searchBox).toHaveValue("test search");
    await searchBox.clear();
    await expect(searchBox).toHaveValue("");
  });

  test("should not have JavaScript errors on load", async ({ page }) => {
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
    await page.waitForLoadState("load");

    const criticalErrors = errors.filter(
      (error) =>
        !error.includes("favicon") &&
        !error.includes("google-analytics") &&
        !error.includes("gtag")
    );

    expect(criticalErrors).toHaveLength(0);
  });
});
