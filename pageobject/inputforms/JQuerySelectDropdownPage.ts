import { expect, Page } from "@playwright/test";

export class JQuerySelectDropdownPage {
  readonly page: Page;

  /**
   * JQuerySelectDropdownPage constructor.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Method to check if the JQuerySelectDropdownPage is visible
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

export default JQuerySelectDropdownPage;
