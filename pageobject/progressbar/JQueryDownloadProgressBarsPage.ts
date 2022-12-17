import { expect, Page } from "@playwright/test";

export class JQueryDownloadProgressBarsPage {
  readonly page: Page;

  /**
   * JQueryDownloadProgressBarsPage constructor.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Method to check if the JQueryDownloadProgressBarsPage is visible
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

export default JQueryDownloadProgressBarsPage;
