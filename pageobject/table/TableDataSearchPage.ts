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
    expect(this.page.url()).toEqual("");
    await expect(
      this.page.locator("", {
        hasText: "",
      })
    ).toBeVisible();
  }
}

export default AjaxFormSubmitPage;
