import { expect, Page } from "@playwright/test";

export class BootstrapModalsPage {
  readonly page: Page;

  /**
   * BootstrapModalsPage constructor.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Method to check if the BootstrapModalsPage is visible
   */
  async isReady() {
    expect(this.page.url()).toEqual(
      "https://demo.seleniumeasy.com/bootstrap-modal-demo.html"
    );
    await expect(
      this.page.locator("h2", {
        hasText: "Bootstrap Modal Example for Automation",
      })
    ).toBeVisible();
  }
}

export default BootstrapModalsPage;
