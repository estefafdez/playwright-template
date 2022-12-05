import { expect, Page } from "@playwright/test";
import FooterElements from "../elements/FooterElements";
import HeaderElements from "../elements/HeaderElements";
import MenuElements from "../elements/MenuElements";

export class HomePage {
  footer: any;
  header: any;
  menu: any;
  page: any;

  /**
   * Homepage constructor. We need to create a new instance of the Header and the Footer.
   */
  constructor() {
    this.header = new HeaderElements();
    this.footer = new FooterElements();
    this.menu = new MenuElements();
  }

  /**
   * Method to visit the webpage URL
   */
  async visit() {
    await this.page.goto("/");
  }

  /**
   * Method to check if the Homepage is loaded (include the Header and Footer elements)
   */
  async isReady() {
    this.header.isReady();
    expect(this.page.url()).toEqual("https://demo.seleniumeasy.com");
    await expect(this.page.locator("body > :nth-child(2)")).toBeVisible();
    await expect(this.page.locator("#easycont > :nth-child(1)")).toBeVisible();
    this.footer.isReady();
  }

  /**
   * Method to click to close the popup once is displayed.
   */
  async closePopUp() {
    const checkPopup = this.page.locator("#at-cv-lightbox-header");

    if (checkPopup) {
      await this.page.click("#at-cv-lightbox-header");
    }
  }

  /*--------------------------------------------------------------------*
	|      CHECK METHODS                                    
	*---------------------------------------------------------------------*/

  /*-----------------------------HEADER---------------------------------*/

  /**
   * Check that the Selenium Easy Logo is visible.
   */
  checkSeleniumEasyLogoIsVisible() {
    return this.header.getSeleniumEasyLogo().toBeVisible();
  }

  /**
   * Check that the CrossBrowserTesting Logo is visible.
   */
  checkCrossBrowserTestingLogoIsVisible() {
    return this.header.getCrossBrowserTestingLogo().toBeVisible();
  }
}

export default HomePage;
