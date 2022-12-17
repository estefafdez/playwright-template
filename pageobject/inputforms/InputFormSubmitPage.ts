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
    expect(this.page.url()).toEqual(
      "https://demo.seleniumeasy.com/input-form-demo.html"
    );
    await expect(
      this.page.locator("h2", {
        hasText: "Input form with validations",
      })
    ).toBeVisible();
  }
}

export default InputFormSubmitPage;
