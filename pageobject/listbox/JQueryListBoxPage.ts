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
    expect(this.page.url()).toEqual("");
    await expect(
      this.page.locator("", {
        hasText: "",
      })
    ).toBeVisible();
  }
}

export default JQueryListBoxPage;
