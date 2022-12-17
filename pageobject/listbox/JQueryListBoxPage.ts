import { expect, Page } from "@playwright/test";

export class JQueryListBoxPage {
  readonly page: Page;

  /**
   * JQueryListBoxPage constructor.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Method to check if the JQueryListBoxPage is visible
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

export default JQueryListBoxPage;
