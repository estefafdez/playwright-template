import { Page } from "@playwright/test";
import { baseURL } from "../config/baseURL";
import { NavigationElements } from "../elements/NavigationElements";

export class NavigationPage {
  readonly page: Page;
  navigationElements: NavigationElements;

  constructor(page: Page) {
    this.page = page;
    this.navigationElements = new NavigationElements(this.page);
  }

  async navigate() {
    await this.page.goto(baseURL.web);
  }

  async clickHomeLink() {
    await this.navigationElements.homeLink.click();
  }

  async clickAboutLink() {
    await this.navigationElements.aboutLink.click();
  }

  async clickContactLink() {
    await this.navigationElements.contactLink.click();
  }

  async clickServicesLink() {
    await this.navigationElements.servicesLink.click();
  }

  async toggleMobileMenu() {
    await this.navigationElements.mobileMenuToggle.click();
  }
}

export default NavigationPage;
