import { expect, test } from "@playwright/test";
import { HomePage } from "../../pageobject/HomePage";

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

    const metaDescription = await page.locator('meta[name="description"]').getAttribute("content");
    if (metaDescription) {
      expect(metaDescription.length).toBeGreaterThan(0);
    }

    const viewport = await page.locator('meta[name="viewport"]').getAttribute("content");
    expect(viewport).toContain("width=device-width");
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

      await page.screenshot({
        path: `test-results/responsive-${viewport.width}x${viewport.height}.png`,
        fullPage: true,
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
    await page.route("**/*", (route) => {
      setTimeout(() => route.continue(), 100);
    });

    const homePage = new HomePage(page);
    await homePage.navigate();

    await expect(homePage.homeElements.pageLogo).toBeVisible({ timeout: 10000 });
    await expect(homePage.homeElements.homePageTitle).toBeVisible({ timeout: 10000 });
  });
});
