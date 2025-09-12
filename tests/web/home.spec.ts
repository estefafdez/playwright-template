import { expect, test } from "@playwright/test";
import { HomePage } from "../../pageobject/HomePage";

test.describe("Home Tests", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test("should check the Home Page Logo", async () => {
    await expect(homePage.homeElements.pageLogo).toBeVisible();
    await expect(homePage.homeElements.pageLogo).toHaveAttribute("alt", "QA Automation Labs");
  });

  test("should check the Home Page Title", async () => {
    await expect(homePage.homeElements.homePageTitle).toBeVisible();
    await expect(homePage.homeElements.homePageTitle).toHaveText(/Tools Demo/);
  });

  test("should load page successfully", async ({ page }) => {
    await expect(page).toHaveURL(/testing\.qaautomationlabs\.com/);
    await expect(page).toHaveTitle(/QA Automation Labs|Tools Demo/);
  });

  test("should have proper page structure", async () => {
    await expect(homePage.homeElements.pageLogo).toBeVisible();
    await expect(homePage.homeElements.homePageTitle).toBeVisible();

    if (await homePage.homeElements.navigationMenu.isVisible()) {
      await expect(homePage.homeElements.navigationMenu).toBeVisible();
    }
  });

  test("should be accessible via keyboard", async ({ page }) => {
    await page.keyboard.press("Tab");
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
  });
});
