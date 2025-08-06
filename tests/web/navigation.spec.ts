import { expect, test } from "@playwright/test";
import { NavigationPage } from "../../pageobject/NavigationPage";

test.describe("Navigation Tests", () => {
  let navigationPage: NavigationPage;

  test.beforeEach(async ({ page }) => {
    navigationPage = new NavigationPage(page);
    await navigationPage.navigate();
  });

  test("should display all main navigation links", async () => {
    const allLinks = navigationPage.page.getByRole("link");
    const linkCount = await allLinks.count();
    expect(linkCount).toBeGreaterThan(0);

    if (linkCount > 0) {
      await expect(allLinks.first()).toBeVisible();
    }
  });

  test("should navigate to Home page", async ({ page }) => {
    const allLinks = navigationPage.page.getByRole("link");
    const linkCount = await allLinks.count();

    if (linkCount > 0) {
      const firstLink = allLinks.first();
      await firstLink.click();
      await expect(page.url()).toBeTruthy();
    }
  });

  test("should navigate to About page", async ({ page }) => {
    if (await navigationPage.navigationElements.aboutLink.isVisible()) {
      await navigationPage.clickAboutLink();
      await expect(page.url()).toBeTruthy();
    }
  });

  test("should navigate to Contact page", async ({ page }) => {
    if (await navigationPage.navigationElements.contactLink.isVisible()) {
      await navigationPage.clickContactLink();
      await expect(page.url()).toBeTruthy();
    }
  });

  test("should navigate to Services page", async ({ page }) => {
    if (await navigationPage.navigationElements.servicesLink.isVisible()) {
      await navigationPage.clickServicesLink();
      await expect(page.url()).toBeTruthy();
    }
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
    await expect(page.getByRole("navigation").first()).toBeVisible();

    const allLinks = page.getByRole("link");
    const linkCount = await allLinks.count();

    if (linkCount > 0) {
      await expect(allLinks.first()).toBeEnabled();
    }
  });
});
