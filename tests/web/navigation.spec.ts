import { expect, test } from "@playwright/test";
import { NavigationPage } from "../../pageobject/NavigationPage";

test.describe("Navigation Tests", () => {
  let navigationPage: NavigationPage;

  test.beforeEach(async ({ page }) => {
    navigationPage = new NavigationPage(page);
    await navigationPage.navigate();
  });

  test("should display all main navigation links", async () => {
    await expect(navigationPage.navigationElements.homeLink).toBeVisible();
    await expect(navigationPage.navigationElements.aboutLink).toBeVisible();
    await expect(navigationPage.navigationElements.contactLink).toBeVisible();
    await expect(navigationPage.navigationElements.servicesLink).toBeVisible();
  });

  test("should navigate to Home page", async ({ page }) => {
    await navigationPage.clickHomeLink();
    await expect(page).toHaveURL(/.*home/);
  });

  test("should navigate to About page", async ({ page }) => {
    await navigationPage.clickAboutLink();
    await expect(page).toHaveURL(/.*about/);
  });

  test("should navigate to Contact page", async ({ page }) => {
    await navigationPage.clickContactLink();
    await expect(page).toHaveURL(/.*contact/);
  });

  test("should navigate to Services page", async ({ page }) => {
    await navigationPage.clickServicesLink();
    await expect(page).toHaveURL(/.*services/);
  });

  test("should toggle mobile menu on smaller screens", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const mobileToggle = navigationPage.navigationElements.mobileMenuToggle;
    if (await mobileToggle.isVisible()) {
      await navigationPage.toggleMobileMenu();
      await expect(navigationPage.navigationElements.homeLink).toBeVisible();
    }
  });

  test("should have correct navigation structure", async ({ page }) => {
    const navigation = navigationPage.navigationElements;

    await expect(page.getByRole("navigation")).toBeVisible();

    await expect(navigation.homeLink).toBeEnabled();
    await expect(navigation.aboutLink).toBeEnabled();
    await expect(navigation.contactLink).toBeEnabled();
    await expect(navigation.servicesLink).toBeEnabled();
  });
});
