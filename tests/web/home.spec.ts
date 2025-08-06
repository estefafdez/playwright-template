import { expect, test } from "@playwright/test";
import { HomePage } from "../../pageobject/HomePage";

test.describe("Home Tests", () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
  });

  test("should check the Home Page Logo and Main Title", async ({ page }) => {
    const homePage = new HomePage(page);
    await expect(homePage.homeElements.pageLogo).toBeVisible();
    await expect(homePage.homeElements.homePageTitle).toBeVisible();
  });
});