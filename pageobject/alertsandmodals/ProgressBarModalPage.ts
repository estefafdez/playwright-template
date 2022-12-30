import { expect, Page } from "@playwright/test";

export class ProgressBarModalPage {
  readonly page: Page;

  /**
   * ProgressBarModalPage constructor.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Method to check if the ProgressBarModalPage is visible
   */
  async isReady() {
    expect(this.page.url()).toEqual(
      "https://demo.seleniumeasy.com/bootstrap-progress-bar-dialog-demo.html"
    );
    await expect(
      this.page.locator("h2", {
        hasText: "Modal dialog with progress bar",
      })
    ).toBeVisible();
  }
}

export default ProgressBarModalPage;
