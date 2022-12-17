import { expect, Page } from "@playwright/test";

export class SimpleFormDemoPage {
  readonly page: Page;

  /**
   * SimpleFormDemoPage constructor.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Method to check if the SimpleFormDemoPage is visible
   */
  async isReady() {
    expect(this.page.url()).toEqual("");
    await expect(
      this.page.locator("", {
        hasText: "",
      })
    ).toBeVisible();
  }
}

export default SimpleFormDemoPage;
