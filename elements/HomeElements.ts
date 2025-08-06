import { Locator, Page } from "@playwright/test";

export class HomeElements {
  readonly page: Page;
  readonly pageLogo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageLogo = this.page.locator("img[alt='QA Automation Labs']");
  }
}

export default HomeElements;
