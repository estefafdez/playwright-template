import { expect, Page } from "@playwright/test";

export class BootstrapListPage {
  readonly page: Page;

  /**
   * BootstrapListPage constructor.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Method to check if the BootstrapListPage is visible
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

export default BootstrapListPage;
