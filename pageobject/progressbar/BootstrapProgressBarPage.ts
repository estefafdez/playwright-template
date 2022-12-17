import { expect, Page } from "@playwright/test";

export class BootstrapProgressBarPage {
  readonly page: Page;

  /**
   * BootstrapProgressBarPage constructor.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Method to check if the BootstrapProgressBarPage is visible
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

export default BootstrapProgressBarPage;
