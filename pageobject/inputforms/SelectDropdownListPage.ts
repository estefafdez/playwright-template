import { expect, Page } from "@playwright/test";

export class SelectDropdownListPage {
  readonly page: Page;

  /**
   * SelectDropdownListPage constructor.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Method to check if the SelectDropdownListPage is visible
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

export default SelectDropdownListPage;
