import { expect, Page } from "@playwright/test";

export class InputFormSubmitPage {
  readonly page: Page;

  /**
   * InputFormSubmitPage constructor.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Method to check if the InputFormSubmitPage is visible
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

export default InputFormSubmitPage;
