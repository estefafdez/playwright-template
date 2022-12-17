import { expect, Page } from "@playwright/test";

export class FileDownloadPage {
  readonly page: Page;

  /**
   * FileDownloadPage constructor.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Method to check if the FileDownloadPage is visible
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

export default FileDownloadPage;
