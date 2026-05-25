import { Page } from "@playwright/test";
import { baseURL } from "../config/baseURL";
import { FormElements } from "../elements/FormElements";

export class ContactPage {
  readonly page: Page;
  formElements: FormElements;

  constructor(page: Page) {
    this.page = page;
    this.formElements = new FormElements(this.page);
  }

  async navigate() {
    await this.page.goto(baseURL.web);
  }

  async fillContactForm(name: string, email: string, message: string) {
    await this.formElements.nameInput.fill(name);
    await this.formElements.emailInput.fill(email);
    await this.formElements.messageTextarea.fill(message);
  }

  async submitForm() {
    await this.formElements.submitButton.click();
  }

  async resetForm() {
    await this.formElements.resetButton.click();
  }
}

export default ContactPage;
