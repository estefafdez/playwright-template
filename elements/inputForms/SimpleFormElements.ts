import { Locator, Page } from "@playwright/test";

export class SimpleFormElements {
  readonly page: Page;
  readonly userMessageInput: Locator;
  readonly showMessageButton: Locator;
  readonly yourMessageText: Locator;
  readonly input1: Locator;
  readonly input2: Locator;
  readonly getTotalButton: Locator;
  readonly totalResult: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userMessageInput = this.page.locator(".form-group > #user-message");
    this.showMessageButton = this.page.locator("#get-input > .btn", {
      hasText: "Show Message",
    });
    this.yourMessageText = this.page.locator("#display");
    this.input1 = this.page.locator("#sum1");
    this.input2 = this.page.locator("#sum2");
    this.getTotalButton = this.page.locator("#gettotal > .btn", {
      hasText: "Get Total",
    });
    this.totalResult = this.page.locator("#displayvalue");
  }
}

export default SimpleFormElements;
