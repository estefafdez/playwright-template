import { expect, Page } from "@playwright/test";

export class WindowPopupModalPage {
  readonly page: Page;

  /**
   * WindowPopupModalPage constructor.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Method to check if the WindowPopupModalPage is visible
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

export default WindowPopupModalPage;
