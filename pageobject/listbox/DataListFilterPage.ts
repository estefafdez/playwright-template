import { expect, Page } from "@playwright/test";

export class DataListFilterPage {
  readonly page: Page;

  /**
   * DataListFilterPage constructor.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Method to check if the DataListFilterPage is visible
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

export default DataListFilterPage;
