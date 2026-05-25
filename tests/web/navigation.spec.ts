import { expect, test } from "@playwright/test";
import { NavigationPage } from "../../pages/NavigationPage";

test.describe.skip("Navigation Tests", () => {
  let navigationPage: NavigationPage;

  test.beforeEach(async ({ page }) => {
    navigationPage = new NavigationPage(page);
    await navigationPage.navigate();
  });

  test("should display all main navigation links", async () => {
    await expect(navigationPage.navigationElements.homeLink).toBeVisible();
    await expect(navigationPage.navigationElements.aboutLink).toBeVisible();
    await expect(navigationPage.navigationElements.contactLink).toBeVisible();
  });

  test("should navigate to About page", async ({ page }) => {
    await navigationPage.clickAboutLink();
    await expect(page).toHaveURL(/about/i);
  });

  test("should navigate to Contact page", async ({ page }) => {
    await navigationPage.clickContactLink();
    await expect(page).toHaveURL(/contact/i);
  });

  test("should navigate to Services page", async ({ page }) => {
    await navigationPage.clickServicesLink();
    await expect(page).toHaveURL(/services/i);
  });

  test("should toggle mobile menu on smaller screens", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await navigationPage.toggleMobileMenu();
    await expect(navigationPage.navigationElements.homeLink).toBeVisible();
  });

  test("should have correct navigation structure", async ({ page }) => {
    await expect(page.getByRole("navigation").first()).toBeVisible();
    await expect(navigationPage.navigationElements.homeLink).toBeEnabled();
  });
});
