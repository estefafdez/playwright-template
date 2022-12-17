import { expect, Page } from "@playwright/test";

export class TableDataDownloadPage {
  readonly page: Page;

  /**
   * TableDataDownloadPage constructor.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Method to check if the TableDataDownloadPage is visible
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

export default TableDataDownloadPage;
