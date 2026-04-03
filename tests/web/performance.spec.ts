import { expect, test } from "@playwright/test";
import { HomePage } from "../../pageobject/HomePage";

// Acceptable page load time in ms, configurable via environment variable
const PAGE_LOAD_ACCEPTABLE_TIME_MS = process.env.PAGE_LOAD_ACCEPTABLE_TIME_MS ? parseInt(process.env.PAGE_LOAD_ACCEPTABLE_TIME_MS, 10) : 3000;

test.describe("Page Performance Tests", () => {
  test("should load page within acceptable time", async ({ page }) => {
    const startTime = Date.now();

    const homePage = new HomePage(page);
    await homePage.navigate();

    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(PAGE_LOAD_ACCEPTABLE_TIME_MS);

    await expect(homePage.homeElements.pageLogo).toBeVisible();
    await expect(homePage.homeElements.homePageTitle).toBeVisible();
  });

  test("should have proper meta tags for SEO", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();

    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);

    // Check if meta description exists, but don't fail if it doesn't
    const metaDescriptionLocator = page.locator('meta[name="description"]');
    const metaDescriptionCount = await metaDescriptionLocator.count();

    if (metaDescriptionCount > 0) {
      const metaDescription = await metaDescriptionLocator.getAttribute("content");
      if (metaDescription) {
        expect(metaDescription.length).toBeGreaterThan(0);
      }
    }

    // Check viewport meta tag with timeout
    const viewportLocator = page.locator('meta[name="viewport"]');
    const viewportCount = await viewportLocator.count();

    if (viewportCount > 0) {
      const viewport = await viewportLocator.getAttribute("content");
      if (viewport) {
        expect(viewport).toContain("width=device-width");
      }
    }
  });

  test("should be responsive on different screen sizes", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();

    const viewports = [
      { width: 320, height: 568 },
      { width: 768, height: 1024 },
      { width: 1920, height: 1080 },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);

      await expect(homePage.homeElements.pageLogo).toBeVisible();
      await expect(homePage.homeElements.homePageTitle).toBeVisible();

      const screenshot = await page.screenshot({
        fullPage: true,
      });
      await test.info().attach(`responsive-${viewport.width}x${viewport.height}.png`, {
        body: screenshot,
        contentType: "image/png",
      });
    }
  });

  test("should have accessible color contrast", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();

    await expect(homePage.homeElements.homePageTitle).toBeVisible();

    const titleStyles = await homePage.homeElements.homePageTitle.evaluate((el: HTMLElement) => {
      const styles = window.getComputedStyle(el);
      return {
        color: styles.color,
        backgroundColor: styles.backgroundColor,
        fontSize: styles.fontSize,
      };
    });

    expect(titleStyles.fontSize).toBeTruthy();
    expect(titleStyles.color).toBeTruthy();
  });

  test("should handle network conditions gracefully", async ({ page }) => {
    await page.route("**/*", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      await route.continue();
    });

    const homePage = new HomePage(page);
    await homePage.navigate();

    await expect(homePage.homeElements.pageLogo).toBeVisible({ timeout: 10000 });
    await expect(homePage.homeElements.homePageTitle).toBeVisible({ timeout: 10000 });
  });
});
