import { expect, Page } from "@playwright/test";

export class CheckboxDemoPage {
  readonly page: Page;

  /**
   * CheckboxDemoPage constructor.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Method to check if the CheckboxDemoPage is visible
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

export default CheckboxDemoPage;
