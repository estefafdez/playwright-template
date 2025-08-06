import { expect, test } from "@playwright/test";
import { HomePage } from "../../pageobject/HomePage";

test.describe("Home Tests", () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
  });

  test("should login with valid credentials", async ({ page }) => {
    const homePage = new HomePage(page);
    expect(await page.url()).toBe("https://testing.qaautomationlabs.com");
  });
});