import { expect, Page } from "@playwright/test";

export class DynamicDataLoadingPage {
  readonly page: Page;

  /**
   * DynamicDataLoadingPage constructor.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Method to check if the DynamicDataLoadingPage is visible
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

export default DynamicDataLoadingPage;
