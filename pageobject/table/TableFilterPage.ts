import { expect, Page } from "@playwright/test";

export class TableFilterPage {
  readonly page: Page;

  /**
   * TableFilterPage constructor.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Method to check if the TableFilterPage is visible
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

export default TableFilterPage;
