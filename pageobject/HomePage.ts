import { Page } from "@playwright/test";
import { baseURL } from "../config/baseURL";
import { HomeElements } from "../elements/HomeElements";

export class HomePage {
  readonly page: Page;
  homeElements: HomeElements;

  /**
   * Homepage constructor.
   */
  constructor(page: Page) {
    this.page = page;
    this.homeElements = new HomeElements(this.page);
  }

  /**
   * Method to visit the webpage URL
   */
  async navigate() {
    await this.page.goto(baseURL.web);
  }

}

export default HomePage;
