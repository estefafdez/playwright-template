import { expect, Locator, Page } from "@playwright/test";

export class HeaderElements {
  readonly page: Page;
  readonly seleniumEasyLogo: Locator;
  readonly crossBrowserTestingLogo: Locator;
  readonly inputForm: Locator;
  readonly simpleFormDemo: Locator;
  readonly checkBoxDemo: Locator;
  readonly radioButtonDemo: Locator;
  readonly selectDropdownList: Locator;
  readonly inputFormSubmit: Locator;
  readonly ajaxFormSubmit: Locator;
  readonly jQuerySelectDropdown: Locator;
  readonly datePickers: Locator;
  readonly bootstrapDatePicker: Locator;
  readonly jQueryDatePicker: Locator;
  readonly table: Locator;
  readonly tablePagination: Locator;
  readonly tableDataSearch: Locator;
  readonly tableFilter: Locator;
  readonly tableSortAndSearch: Locator;
  readonly tableDataDownload: Locator;
  readonly demoHome: Locator;
  readonly progressBar: Locator;
  readonly jQueryDownloadProgressBars: Locator;
  readonly bootstrapProgressBar: Locator;
  readonly dragAndDropSliders: Locator;
  readonly alertsAndModals: Locator;
  readonly bootstrapAlerts: Locator;
  readonly bootstrapModals: Locator;
  readonly windowPopupModal: Locator;
  readonly progressBarModal: Locator;
  readonly javascriptAlerts: Locator;
  readonly fileDownload: Locator;
  readonly listBox: Locator;
  readonly bootstrapListBox: Locator;
  readonly jqueryListBox: Locator;
  readonly dataListFilter: Locator;
  readonly bootstrapDataListFilter: Locator;
  readonly jqueryDataListFilter: Locator;
  readonly dragAndDrop: Locator;
  readonly bootstrapDragAndDrop: Locator;
  readonly jqueryDragAndDrop: Locator;
  readonly others: Locator;
  readonly dynamicDataLoading: Locator;
  readonly scrolledPage: Locator;
  readonly bootstrapModal: Locator;
  readonly jqueryModal: Locator;
  readonly bootstrapModalDialog: Locator;
  readonly jqueryModalDialog: Locator;
  readonly bootstrapModalForm: Locator;
  readonly jqueryModalForm: Locator;
  readonly bootstrapModalProgressBar: Locator;
  readonly jqueryModalProgressBar: Locator;
  readonly bootstrapModalPopup: Locator;
  readonly jqueryModalPopup: Locator;
  readonly bootstrapModalTooltip: Locator;
  readonly jqueryModalTooltip: Locator;
  readonly bootstrapModalWindow: Locator;
  readonly jqueryModalWindow: Locator;
  readonly jQueryListBox: Locator;
  readonly chartsDemo: Locator;

  constructor(page: Page) {
    this.page = page;

    this.seleniumEasyLogo = this.page.locator(".logo > a > img");
    this.crossBrowserTestingLogo = this.page.locator(".cbt");

    // Input Form option on the header
    this.inputForm = this.page.locator(".dropdown-toggle", {
      hasText: "Input Forms",
    });

    // Input Form sub-options on the header
    this.simpleFormDemo = this.page.locator("a", {
      hasText: "Simple Form Demo",
    });

    this.checkBoxDemo = this.page.locator("a", { hasText: "Checkbox Demo" });
    this.radioButtonDemo = this.page.locator("a", {
      hasText: "Radio Buttons Demo",
    });
    this.selectDropdownList = this.page.locator("a", {
      hasText: "Select Dropdown List",
    });
    this.inputFormSubmit = this.page.locator("a", {
      hasText: "Input Form Submit",
    });
    this.ajaxFormSubmit = this.page.locator("a", {
      hasText: "Ajax Form Submit",
    });
    this.jQuerySelectDropdown = this.page.locator("a", {
      hasText: "JQuery Select dropdown",
    });

    // Date Pickers option on the header
    this.datePickers = this.page.locator(".dropdown-toggle", {
      hasText: "Date pickers",
    });

    // Date Pickers sub-options on the header
    this.bootstrapDatePicker = this.page.locator("a", {
      hasText: "Bootstrap Date Picker",
    });
    this.jQueryDatePicker = this.page.locator("a", {
      hasText: "JQuery Date Picker",
    });

    // Table option on the header
    this.table = this.page.locator(".dropdown-toggle", { hasText: "Table" });

    // Table sub-options on the header
    this.tablePagination = this.page.locator("a", {
      hasText: "Table Pagination",
    });
    this.tableDataSearch = this.page.locator("a", {
      hasText: "Table Data Search",
    });
    this.tableFilter = this.page.locator("a", { hasText: "Table Filter" });
    this.tableSortAndSearch = this.page.locator("a", {
      hasText: "Table Sort & Search",
    });
    this.tableDataDownload = this.page.locator("a", {
      hasText: "Table Data Download",
    });

    // Demo Home option on the header
    this.demoHome = this.page.locator(".navbar-brand", {
      hasText: "Demo Home",
    });

    // Progress Bar option on the header
    this.progressBar = this.page.locator(".dropdown-toggle", {
      hasText: "Progress Bars",
    });

    // Progress Bar sub-options on the header
    this.jQueryDownloadProgressBars = this.page.locator("a", {
      hasText: "JQuery Download Progress bars",
    });
    this.bootstrapProgressBar = this.page.locator("a", {
      hasText: "Bootstrap Progress bar",
    });
    this.dragAndDropSliders = this.page.locator("a", {
      hasText: "Drag & Drop Sliders",
    });

    // Alerts & Modals option on the header
    this.alertsAndModals = this.page.locator(".dropdown-toggle", {
      hasText: "Alerts & Modals",
    });

    // Alerts & Modals sub-options on the header
    this.bootstrapAlerts = this.page.locator("a", {
      hasText: "Bootstrap Alerts",
    });
    this.bootstrapModals = this.page.locator("a", {
      hasText: "Bootstrap Modals",
    });
    this.windowPopupModal = this.page.locator("a", {
      hasText: "Window Popup Modal",
    });
    this.progressBarModal = this.page.locator("a", {
      hasText: "Progress Bar Modal",
    });
    this.javascriptAlerts = this.page.locator("a", {
      hasText: "Javascript Alerts",
    });
    this.fileDownload = this.page.locator("a", { hasText: "File Download" });

    // List Box option on the header
    this.listBox = this.page.locator(".dropdown-toggle", {
      hasText: "List Box",
    });

    // List Box sub-options on the header
    this.bootstrapListBox = this.page.locator("a", {
      hasText: "Bootstrap List Box",
    });
    this.jQueryListBox = this.page.locator("a", { hasText: "JQuery List Box" });
    this.dataListFilter = this.page.locator("a", {
      hasText: "Data List Filter",
    });

    // Others option on the header
    this.others = this.page.locator(".dropdown-toggle", { hasText: "Others" });

    // Others sub-options on the header
    this.dragAndDrop = this.page.locator("a", { hasText: "Drag and Drop" });
    this.dynamicDataLoading = this.page.locator("a", {
      hasText: "Dynamic Data Loading",
    });
    this.chartsDemo = this.page.locator("a", { hasText: "Charts Demo" });
  }

  /**
   * Method to check if the Header is visible
   */
  async isReady() {
    await expect(this.page.locator(".topper")).toBeVisible();
    await expect(this.page.locator(".navbar")).toBeVisible();
  }
}

export default HeaderElements;
