import { expect, Page } from "@playwright/test";

export class JavascriptAlertsPage {
  readonly page: Page;

  /**
   * JavascriptAlertsPage constructor.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Method to check if the JavascriptAlertsPage is visible
   */
  async isReady() {
    expect(this.page.url()).toEqual(
      "https://demo.seleniumeasy.com/javascript-alert-box-demo.html"
    );
    await expect(
      this.page.locator("h3", {
        hasText:
          "JavaScript has three kind of popup boxes: Alert box, Confirm box, and Prompt box.",
      })
    ).toBeVisible();
  }
}

export default JavascriptAlertsPage;
