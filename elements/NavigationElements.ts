import { Locator, Page } from "@playwright/test";

export class NavigationElements {
  readonly page: Page;
  readonly homeLink: Locator;
  readonly aboutLink: Locator;
  readonly servicesLink: Locator;
  readonly contactLink: Locator;
  readonly blogLink: Locator;
  readonly mobileMenuToggle: Locator;
  readonly breadcrumb: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeLink = this.page.getByRole("link", { name: /home/i });
    this.aboutLink = this.page.getByRole("link", { name: /about/i });
    this.servicesLink = this.page.getByRole("link", { name: /services/i });
    this.contactLink = this.page.getByRole("link", { name: /contact/i });
    this.blogLink = this.page.getByRole("link", { name: /blog/i });
    this.mobileMenuToggle = this.page.getByTestId("mobile-menu-toggle");
    this.breadcrumb = this.page.getByRole("navigation", { name: /breadcrumb/i });
  }
}

export default NavigationElements;
