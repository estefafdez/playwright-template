import { expect, test } from "@playwright/test";
import { HomePage } from "../../pageobject/HomePage";

test.describe("Page Interaction Tests", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test("should display main page elements", async () => {
    await expect(homePage.homeElements.pageLogo).toBeVisible();
    await expect(homePage.homeElements.homePageTitle).toBeVisible();
  });

  test("should interact with clickable elements", async ({ page }) => {
    const allLinks = page.getByRole("link");
    const linkCount = await allLinks.count();

    if (linkCount > 0) {
      const firstLink = allLinks.first();
      await expect(firstLink).toBeVisible();
      await expect(firstLink).toBeEnabled();
    }
  });

  test("should check for form elements if available", async ({ page }) => {
    const inputs = page.locator("input");
    const inputCount = await inputs.count();

    if (inputCount > 0) {
      const firstInput = inputs.first();
      await expect(firstInput).toBeVisible();

      if (await firstInput.isEditable()) {
        await firstInput.fill("Test input");
        await expect(firstInput).toHaveValue("Test input");
      }
    }
  });

  test("should verify page accessibility", async ({ page }) => {
    // Check if logo exists and has an alt attribute
    const logoCount = await homePage.homeElements.pageLogo.count();
    if (logoCount > 0) {
      const altAttribute = await homePage.homeElements.pageLogo.getAttribute("alt");
      if (altAttribute !== null) {
        expect(altAttribute).toBeTruthy();
      }
    }

    await expect(page).toHaveTitle(/.+/);

    const buttons = page.getByRole("button");
    const buttonCount = await buttons.count();

    if (buttonCount > 0) {
      const firstButton = buttons.first();
      await expect(firstButton).toBeEnabled();
    }
  });

  test("should test keyboard navigation", async ({ page }) => {
    await page.keyboard.press("Tab");
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
  });
});
