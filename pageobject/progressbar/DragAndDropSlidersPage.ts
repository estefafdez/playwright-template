import { expect, Page } from "@playwright/test";

export class DragAndDropSlidersPage {
  readonly page: Page;

  /**
   * DragAndDropSlidersPage constructor.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Method to check if the DragAndDropSlidersPage is visible
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

export default DragAndDropSlidersPage;
