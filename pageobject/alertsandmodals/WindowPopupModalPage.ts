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
    expect(this.page.url()).toEqual(
      "https://demo.seleniumeasy.com/window-popup-modal-demo.html"
    );
    await expect(
      this.page.locator("h2", {
        hasText: "Window popup Modal Example for Automation",
      })
    ).toBeVisible();
  }
}

export default WindowPopupModalPage;
