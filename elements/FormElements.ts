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
    this.nameInput = this.page.getByRole("textbox", { name: /name/i });
    this.emailInput = this.page.getByRole("textbox", { name: /email/i });
    this.messageTextarea = this.page.getByRole("textbox", { name: /message/i });
    this.submitButton = this.page.getByRole("button", { name: /submit/i });
    this.resetButton = this.page.getByRole("button", { name: /reset/i });
    this.successMessage = this.page.getByText(/success/i);
    this.errorMessage = this.page.getByText(/error/i);
    this.requiredFieldError = this.page.getByText(/required/i);
  }
}

export default FormElements;
