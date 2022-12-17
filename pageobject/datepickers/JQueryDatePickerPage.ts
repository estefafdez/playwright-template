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
    expect(this.page.url()).toEqual(
      "https://demo.seleniumeasy.com/jquery-date-picker-demo.html"
    );
    await expect(
      this.page.locator("h2", {
        hasText: "JQuery Date Picker Demo",
      })
    ).toBeVisible();
  }
}

export default JQueryDatePickerPage;
