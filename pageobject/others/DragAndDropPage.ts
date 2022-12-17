import { expect, Page } from "@playwright/test";

export class DragAndDropPage {
  readonly page: Page;

  /**
   * DragAndDropPage constructor.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Method to check if the DragAndDropPage is visible
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

export default DragAndDropPage;
