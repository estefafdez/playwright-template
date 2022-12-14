import { Locator, Page } from "@playwright/test";

export class CheckBoxElements {
  readonly page: Page;
  readonly firstCheckbox: Locator;
  readonly firstSuccessMessage: Locator;
  readonly checkboxOption1: Locator;
  readonly checkboxOption2: Locator;
  readonly checkboxOption3: Locator;
  readonly checkboxOption4: Locator;
  readonly clickAllButton: Locator;
  readonly getInputChecked: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstCheckbox = this.page.locator("#isAgeSelected");
    this.firstSuccessMessage = this.page.locator("#txtAge");
    this.checkboxOption1 = this.page.locator("label", {
      hasText: "Option 1",
    });
    this.checkboxOption2 = this.page.locator("label", { hasText: "Option 2" });
    this.checkboxOption3 = this.page.locator("label", { hasText: "Option 3" });
    this.checkboxOption4 = this.page.locator("label", { hasText: "Option 4" });
    this.clickAllButton = this.page.locator("#check1");
    this.getInputChecked = this.page.locator("#isChkd");
  }
}

export default CheckBoxElements;
