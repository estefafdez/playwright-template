import { expect, Page } from "@playwright/test";

export class TableSortAndSearchPage {
  readonly page: Page;

  /**
   * TableSortAndSearchPage constructor.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Method to check if the TableSortAndSearchPage is visible
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

export default TableSortAndSearchPage;
