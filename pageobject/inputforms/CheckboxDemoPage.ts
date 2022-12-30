import { expect, Page } from "@playwright/test";
import CheckboxElements from "../../elements/inputforms/CheckBoxElements";

export class CheckboxDemoPage {
  readonly page: Page;
  checkBox: any;

  /**
   * CheckboxDemoPage constructor.
   */
  constructor(page: Page) {
    this.page = page;
    this.checkBox = new CheckboxElements(this.page);
  }

  /**
   * Method to check if the CheckboxDemoPage is visible
   */
  async isReady() {
    expect(this.page.url()).toEqual(
      "https://demo.seleniumeasy.com/basic-checkbox-demo.html"
    );
    await expect(
      this.page.locator("h3", {
        hasText:
          "This would be a basic example to start with checkboxes using selenium.",
      })
    ).toBeVisible();
  }

  /**
   * Method to click on the first checkbox button
   */
  clickOnFirstCheckbox() {
    this.checkBox.getFirstCheckbox().click();
  }

  /**
   * Method to check the first checkbox message
   */
  checkFirstCheckboxMessage() {
    this.checkBox
      .getFirstSuccessMessage()
      .contains("Success - Check box is checked");
  }

  /**
   * Method to click on select all button
   */
  clickOnSelectAllButton() {
    this.checkBox.getClickAllButton().click();
  }

  /**
   * Method to check that all the checks are not selected
   */
  checkAllButtonsAreNotSelected() {
    this.checkBox.getInputChecked().should("have.value", "false");
  }

  /**
   * Method to check that all the checks are selected
   */
  checkAllButtonsAreSelected() {
    this.checkBox.getInputChecked().should("have.value", "true");
  }
}

export default CheckboxDemoPage;
