import { Locator, Page } from "@playwright/test";

export class MenuElements {
  readonly page: Page;
  readonly allExamplesMenuOption: Locator;
  readonly inputFormMenuOption: Locator;
  readonly datePickersMenuOption: Locator;
  readonly tableMenuOption: Locator;
  readonly progressBarsSlidersMenuOption: Locator;
  readonly alertsModalsmMenuOption: Locator;
  readonly listBoxMenuOption: Locator;
  readonly othersMenuOption: Locator;

  constructor(page: Page) {
    this.page = page;

    this.allExamplesMenuOption = this.page.locator("a", {
      hasText: "All Examples",
    });
    this.inputFormMenuOption = this.page.locator("a", {
      hasText: "Input Forms",
    });
    this.datePickersMenuOption = this.page.locator("a", {
      hasText: "Date pickers",
    });
    this.tableMenuOption = this.page.locator("a", { hasText: "Table" });
    this.progressBarsSlidersMenuOption = this.page.locator("a", {
      hasText: "Progress Bars & Sliders",
    });
    this.alertsModalsmMenuOption = this.page.locator("a", {
      hasText: "Alerts & Modals",
    });
    this.listBoxMenuOption = this.page.locator("a", { hasText: "List Box" });
    this.othersMenuOption = this.page.locator("a", { hasText: "Others" });
  }
}

export default MenuElements;
