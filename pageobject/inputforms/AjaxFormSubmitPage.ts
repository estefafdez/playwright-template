import { expect, Page } from "@playwright/test";

export class AjaxFormSubmitPage {
  readonly page: Page;

  /**
   * AjaxFormSubmitPage constructor.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Method to check if the AjaxFormSubmitPage is visible
   */
  async isReady() {
    expect(this.page.url()).toEqual(
      "https://demo.seleniumeasy.com/ajax-form-submit-demo.html"
    );
    await expect(
      this.page.locator("h1", {
        hasText: "Ajax Form Submit with Loading icon",
      })
    ).toBeVisible();
  }
}

export default AjaxFormSubmitPage;
