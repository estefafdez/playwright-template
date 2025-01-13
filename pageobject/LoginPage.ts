import { Page } from "@playwright/test";
import { baseURL } from "../config/baseURL";
import LoginElements from "../elements/LoginElements";

export class LoginPage {
  readonly page: Page;
  loginElements: any;

  /**
   * Homepage constructor. We need to create a new instance of the Header and the Footer.
   */
  constructor(page: Page) {
    this.page = page;
    this.loginElements = new LoginElements(this.page);
  }

  /**
   * Method to visit the webpage URL
   */
  async navigate() {
    await this.page.goto(baseURL.web);
  }

  /**
   * Method to login into the application
   * @param username
   * @param password
   */
  async login(username: string, password: string) {
    await this.page.fill(this.loginElements.usernameField, username);
    await this.page.fill(this.loginElements.passwordField, password);
    await this.page.click(this.loginElements.loginButton);
  }

  /**
   * Method to get the error message displayed on the login page
   * @returns the error message displayed on the login page
   */
  async getErrorMessage() {
    return this.page.textContent(this.loginElements.errorMessage);
  }
}

export default LoginPage;
