import { expect, Page } from "@playwright/test";

export class BootstrapDatePickerPage {
  readonly page: Page;

  /**
   * BootstrapDatePickerPage constructor.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Method to check if the BootstrapDatePickerPage is visible
   */
  async isReady() {
    expect(this.page.url()).toEqual(
      "https://demo.seleniumeasy.com/bootstrap-date-picker-demo.html"
    );
    await expect(
      this.page.locator("h1", {
        hasText: "Bootstrap Date Pickers Example",
      })
    ).toBeVisible();
  }
}

export default BootstrapDatePickerPage;
