import { Locator, Page } from "@playwright/test";

export class HomeElements {
  readonly page: Page;
  readonly usernameField: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = this.page.locator("#username");
  }
}

export default HomeElements;
