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
    expect(this.page.url()).toEqual(
      "https://demo.seleniumeasy.com/generate-file-to-download-demo.html"
    );
    await expect(
      this.page.locator("h2", {
        hasText: "File Download Demo for Automation",
      })
    ).toBeVisible();
  }
}

export default DataListFilterPage;
