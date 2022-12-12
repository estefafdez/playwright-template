import { expect, Page } from "@playwright/test";

export class FooterElements {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Method to check if the Footer is visible
   */
  async isReady() {
    await expect(this.page.locator(".footer")).toBeVisible();
  }
}

export default FooterElements;
