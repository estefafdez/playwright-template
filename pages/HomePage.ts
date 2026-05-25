import { Page } from "@playwright/test";
import { HomeElements } from "../elements/HomeElements";

export class HomePage {
  readonly page: Page;
  homeElements: HomeElements;

  constructor(page: Page) {
    this.page = page;
    this.homeElements = new HomeElements(this.page);
  }

  async navigate() {
    await this.page.goto("/");
  }
}

export default HomePage;
