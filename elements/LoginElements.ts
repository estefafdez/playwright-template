import { Locator, Page } from "@playwright/test";

export class LoginElements {
  readonly page: Page;
  readonly allExamplesMenuOption: Locator;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = this.page.locator("#username");
    this.passwordField = this.page.locator("#password");
    this.loginButton = this.page.locator("#login");
    this.errorMessage = this.page.locator(".error");
  }
}

export default LoginElements;
