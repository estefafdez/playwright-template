import { expect, Page } from "@playwright/test";

export class RadioButtonsDemoPage {
  readonly page: Page;

  /**
   * RadioButtonsDemoPage constructor.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Method to check if the RadioButtonsDemoPage is visible
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

export default RadioButtonsDemoPage;
