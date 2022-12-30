import { expect, Page } from "@playwright/test";

export class ChartsDemoDropdownPage {
  readonly page: Page;

  /**
   * ChartsDemoDropdownPage constructor.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Method to check if the ChartsDemoDropdownPage is visible
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

export default ChartsDemoDropdownPage;
