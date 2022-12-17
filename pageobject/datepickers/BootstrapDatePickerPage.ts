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
    expect(this.page.url()).toEqual("");
    await expect(
      this.page.locator("", {
        hasText: "",
      })
    ).toBeVisible();
  }
}

export default BootstrapDatePickerPage;
