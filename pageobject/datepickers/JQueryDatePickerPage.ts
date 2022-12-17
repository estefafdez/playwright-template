import { expect, Page } from "@playwright/test";

export class JQueryDatePickerPage {
  readonly page: Page;

  /**
   * JQueryDatePickerPage constructor.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Method to check if the JQueryDatePickerPage is visible
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

export default JQueryDatePickerPage;
