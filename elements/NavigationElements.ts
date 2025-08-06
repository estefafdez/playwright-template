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
    this.homeLink = this.page.getByRole("link").first();
    this.aboutLink = this.page.getByRole("link").nth(1);
    this.servicesLink = this.page.getByRole("link").nth(2);
    this.contactLink = this.page.getByRole("link").nth(3);
    this.blogLink = this.page.getByRole("link").nth(4);
    this.mobileMenuToggle = this.page.locator('button[class*="menu"], .hamburger, .mobile-menu-toggle').first();
    this.breadcrumb = this.page.getByRole("navigation", { name: /breadcrumb/i });
  }
}

export default NavigationElements;
