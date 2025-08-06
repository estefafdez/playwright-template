import { Locator, Page } from "@playwright/test";

export class HomeElements {
  readonly page: Page;
  readonly pageLogo: Locator;
  readonly homePageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageLogo = this.page.getByRole("img", { name: "QA Automation Labs" });
    this.homePageTitle = this.page.getByRole("heading", { name: "Tools Demo" });
  }
}

export default HomeElements;
