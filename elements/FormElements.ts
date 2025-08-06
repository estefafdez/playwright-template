import { Locator, Page } from "@playwright/test";

export class FormElements {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly messageTextarea: Locator;
  readonly submitButton: Locator;
  readonly resetButton: Locator;
  readonly successMessage: Locator;
  readonly errorMessage: Locator;
  readonly requiredFieldError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = this.page.getByLabel("Name");
    this.emailInput = this.page.locator('input[type="email"]').first();
    this.messageTextarea = this.page.locator("textarea").first();
    this.submitButton = this.page.getByRole("button").first();
    this.resetButton = this.page.getByRole("button", { name: /reset|clear/i });
    this.successMessage = this.page.locator('.success, .alert-success, [class*="success"]');
    this.errorMessage = this.page.locator('.error, .alert-error, [class*="error"]');
    this.requiredFieldError = this.page.locator('.required, .field-error, [class*="required"]');
  }
}

export default FormElements;
