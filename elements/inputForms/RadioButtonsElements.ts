import { Locator, Page } from "@playwright/test";

export class RadioButtonsElements {
  readonly page: Page;
  readonly maleOption: Locator;
  readonly femaleOption: Locator;
  readonly checkGenderValueSelectedButton: Locator;
  readonly genderValueResult: Locator;

  constructor(page: Page) {
    this.page = page;
    this.maleOption = this.page.locator(
      ":nth-child(4) > .panel-body > :nth-child(2)"
    );
    this.femaleOption = this.page.locator(
      ":nth-child(4) > .panel-body > :nth-child(3)"
    );
    this.checkGenderValueSelectedButton = this.page.locator("#buttoncheck");
    this.genderValueResult = this.page.locator(".radiobutton");
  }
  //TODO: Keep adding the elements and do the logic and the test
}

export default RadioButtonsElements;
