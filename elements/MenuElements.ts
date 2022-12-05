import { Page } from "@playwright/test";

export class MenuElements {
  readonly page: Page;

  /**
   * Method to get the All examples menu option
   */
  getAllExamplesMenuOption() {
    return this.page.locator("a", { hasText: "All Examples" });
  }

  /**
   * Method to get the Input Form menu option
   */
  getInputFormMenuOption() {
    return this.page.locator("a", { hasText: "Input Forms" });
  }

  /**
   * Method to get the Date Pickers menu option
   */
  getDatePickersMenuOption() {
    return this.page.locator("a", { hasText: "Date pickers" });
  }

  /**
   * Method to get the Table menu option
   */
  getTableMenuOption() {
    return this.page.locator("a", { hasText: "Table" });
  }

  /**
   * Method to get the Progress Bars & Sliders menu option
   */
  getProgressBarsSlidersMenuOption() {
    return this.page.locator("a", { hasText: "Progress Bars & Sliders" });
  }

  /**
   * Method to get the Alerts & Modals menu option
   */
  getAlertsModalsmMenuOption() {
    return this.page.locator("a", { hasText: "Alerts & Modals" });
  }

  /**
   * Method to get the List Box menu option
   */
  getListBoxMenuOption() {
    return this.page.locator("a", { hasText: "List Box" });
  }

  /**
   * Method to get the Others menu option
   */
  getOthersMenuOption() {
    return this.page.locator("a", { hasText: "Others" });
  }
}

export default MenuElements;
