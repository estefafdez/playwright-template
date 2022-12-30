import { expect, Page } from "@playwright/test";

export class TablePaginationPage {
  readonly page: Page;

  /**
   * TablePaginationPage constructor.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Method to check if the TablePaginationPage is visible
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

export default TablePaginationPage;
