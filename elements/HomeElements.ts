import { Locator, Page } from "@playwright/test";

export class HomeElements {
  readonly page: Page;
  readonly pageLogo: Locator;
  readonly homePageTitle: Locator;
  readonly navigationMenu: Locator;
  readonly footerText: Locator;
  readonly mainContent: Locator;
  readonly searchBox: Locator;
  readonly contactButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageLogo = this.page.getByRole("img", { name: "QA Automation Labs" });
    this.homePageTitle = this.page.getByRole("heading", { name: "Tools Demo" });
    this.navigationMenu = this.page.getByRole("navigation").first();
    this.footerText = this.page.locator("footer");
    this.mainContent = this.page.getByRole("main");
    this.searchBox = this.page.getByRole("textbox", { name: /search/i });
    this.contactButton = this.page.getByRole("link", { name: /contact/i });
  }
}

export default HomeElements;
