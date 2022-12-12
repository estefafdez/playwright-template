import { expect, Locator, Page } from "@playwright/test";

export class HeaderElements {
  readonly page: Page;
  readonly seleniumEasyLogo: Locator;
  readonly crossBrowserTestingLogo: Locator;

  constructor(page: Page) {
    this.page = page;

    this.seleniumEasyLogo = this.page.locator(".logo > a > img");
    this.crossBrowserTestingLogo = this.page.locator(".cbt");
  }

  /**
   * Method to check if the Header is visible
   */
  async isReady() {
    await expect(this.page.locator(".topper")).toBeVisible();
    await expect(this.page.locator(".navbar")).toBeVisible();
  }

  /*--------------------------------------------------------------------* 
      |	Input Form
      *---------------------------------------------------------------------*/

  /**
   * Method to get the Input Form option on the header.
   */
  getInputForm() {
    return this.page.locator(".dropdown-toggle", { hasText: "Input Forms" });
  }

  /*--------------------------------------------------------------------* 
      |	Input Form Submenu
      *---------------------------------------------------------------------*/

  /**
   * Method to get the Simple Form Demo sub-option from the Input Form option on the header.
   */
  getSimpleFormDemo() {
    return this.page.locator("a", { hasText: "Simple Form Demo" });
  }

  /**
   * Method to get the Checkbox Demo sub-option from the Input Form option on the header.
   */
  getCheckboxDemo() {
    return this.page.locator("a", { hasText: "Checkbox Demo" });
  }

  /**
   * Method to get the Radio Buttons Demo sub-option from the Input Form option on the header.
   */
  getRadioButtonsDemo() {
    return this.page.locator("a", { hasText: "Radio Buttons Demo" });
  }

  /**
   * Method to get the Select Dropdown List sub-option from the Input Form option on the header.
   */
  getSelectDropdownList() {
    return this.page.locator("a", { hasText: "Select Dropdown List" });
  }

  /**
   * Method to get the Input Form Submit sub-option from the Input Form option on the header.
   */
  getInputFormSubmit() {
    return this.page.locator("a", { hasText: "Input Form Submit" });
  }

  /**
   * Method to get the Ajax Form Submit sub-option from the Input Form option on the header.
   */
  getAjaxFormSubmit() {
    return this.page.locator("a", { hasText: "Ajax Form Submit" });
  }

  /**
   * Method to get the JQuery Select dropdown sub-option from the Input Form option on the header.
   */
  getJQuerySelectDropdown() {
    return this.page.locator("a", { hasText: "JQuery Select dropdown" });
  }

  /*--------------------------------------------------------------------* 
      |	Date Pickers
      *---------------------------------------------------------------------*/

  /**
   * Method to get the Date Pickers option on the header.
   */
  getDatePickers() {
    return this.page.locator(".dropdown-toggle", { hasText: "Date pickers" });
  }

  /*--------------------------------------------------------------------* 
      |	Date Pickers Submenu
      *---------------------------------------------------------------------*/

  /**
   * Method to get the Bootstrap Date Picker dropdown sub-option from the Date Pickers option on the header.
   */
  getBootstrapDatePicker() {
    return this.page.locator("a", { hasText: "Bootstrap Date Picker" });
  }

  /**
   * Method to get the JQuery Date Picker dropdown sub-option from the Date Pickers option on the header.
   */
  getJQueryDatePicker() {
    return this.page.locator("a", { hasText: "JQuery Date Picker" });
  }

  /*--------------------------------------------------------------------* 
      |	Table
      *---------------------------------------------------------------------*/

  /**
   * Method to get the Table option on the header.
   */
  getTable() {
    return this.page.locator(".dropdown-toggle", { hasText: "Table" });
  }

  /*--------------------------------------------------------------------* 
      |	Table Submenu
      *---------------------------------------------------------------------*/

  /**
   * Method to get the Table Pagination dropdown sub-option from the Table option on the header.
   */
  getTablePagination() {
    return this.page.locator("a", { hasText: "Table Pagination" });
  }

  /**
   * Method to get the Table Data Search dropdown sub-option from the Table option on the header.
   */
  getTableDataSearch() {
    return this.page.locator("a", { hasText: "Table Data Search" });
  }

  /**
   * Method to get the Table Filter dropdown sub-option from the Table option on the header.
   */
  getTableFilter() {
    return this.page.locator("a", { hasText: "Table Filter" });
  }

  /**
   * Method to get the Table Sort & Search dropdown sub-option from the Table option on the header.
   */
  getTableSortAndSearch() {
    return this.page.locator("a", { hasText: "Table Sort & Search" });
  }

  /**
   * Method to get the Table Data Download dropdown sub-option from the Table option on the header.
   */
  getTableDataDownload() {
    return this.page.locator("a", { hasText: "Table Data Download" });
  }

  /*--------------------------------------------------------------------* 
      |	Demo Home
      *---------------------------------------------------------------------*/

  /**
   * Method to get the Demo Home option on the header.
   */
  getDemoHome() {
    return this.page.locator(".navbar-brand", { hasText: "Demo Home" });
  }

  /*--------------------------------------------------------------------* 
      |	Progress Bar
      *---------------------------------------------------------------------*/

  /**
   * Method to get the Progress Bar option on the header.
   */
  getProgressBar() {
    return this.page.locator(".dropdown-toggle", { hasText: "Progress Bars" });
  }

  /*--------------------------------------------------------------------* 
      |	Progress Bar Submenu
      *---------------------------------------------------------------------*/

  /**
   * Method to get the JQuery Download Progress bars dropdown sub-option from the Progress Bar option on the header.
   */
  getJQueryDownloadProgressBars() {
    return this.page.locator("a", { hasText: "JQuery Download Progress bars" });
  }

  /**
   * Method to get the Bootstrap Progress bar dropdown sub-option from the Progress Bar option on the header.
   */
  getBootstrapProgressBar() {
    return this.page.locator("a", { hasText: "Bootstrap Progress bar" });
  }

  /**
   * Method to get the Drag & Drop Sliders dropdown sub-option from the Progress Bar option on the header.
   */
  getDragAndDropSliders() {
    return this.page.locator("a", { hasText: "Drag & Drop Sliders" });
  }

  /*--------------------------------------------------------------------* 
      |	Alerts & Modals
      *---------------------------------------------------------------------*/

  /**
   * Method to get the Alerts and Modals option on the header.
   */
  getAlertsAndModals() {
    return this.page.locator(".dropdown-toggle", {
      hasText: "Alerts & Modals",
    });
  }

  /*--------------------------------------------------------------------* 
      |	Alerts & Modals Submenu
      *---------------------------------------------------------------------*/

  /**
   * Method to get the Bootstrap Alerts dropdown sub-option from the Alerts & Modals option on the header.
   */
  getBootstrapAlerts() {
    return this.page.locator("a", { hasText: "Bootstrap Alerts" });
  }

  /**
   * Method to get the Bootstrap Modals dropdown sub-option from the Alerts & Modals option on the header.
   */
  getBootstrapModals() {
    return this.page.locator("a", { hasText: "Bootstrap Modals" });
  }

  /**
   * Method to get the Window Popup Modal dropdown sub-option from the Alerts & Modals option on the header.
   */
  getWindowPopupModal() {
    return this.page.locator("a", { hasText: "Window Popup Modal" });
  }

  /**
   * Method to get the Progress Bar Modal dropdown sub-option from the Alerts & Modals option on the header.
   */
  getProgressBarModal() {
    return this.page.locator("a", { hasText: "Progress Bar Modal" });
  }

  /**
   * Method to get the Javascript Alerts dropdown sub-option from the Alerts & Modals option on the header.
   */
  getJavascriptAlerts() {
    return this.page.locator("a", { hasText: "Javascript Alerts" });
  }

  /**
   * Method to get the File Download dropdown sub-option from the Alerts & Modals option on the header.
   */
  getFileDownload() {
    return this.page.locator("a", { hasText: "File Download" });
  }

  /*--------------------------------------------------------------------* 
      |	List Box
      *---------------------------------------------------------------------*/

  /**
   * Method to get the List Box option on the header.
   */
  getListBox() {
    return this.page.locator(".dropdown-toggle", { hasText: "List Box" });
  }

  /*--------------------------------------------------------------------* 
      |	List Box Submenu
      *---------------------------------------------------------------------*/

  /**
   * Method to get the Bootstrap List Box dropdown sub-option from the List Box Submenu option on the header.
   */
  getBootstrapListBox() {
    return this.page.locator("a", { hasText: "Bootstrap List Box" });
  }

  /**
   * Method to get the JQuery List Box dropdown sub-option from the List Box Submenu option on the header.
   */
  getJQueryListBox() {
    return this.page.locator("a", { hasText: "JQuery List Box" });
  }

  /**
   * Method to get the Data List Filter dropdown sub-option from the List Box Submenu option on the header.
   */
  getDataListFilter() {
    return this.page.locator("a", { hasText: "Data List Filter" });
  }

  /*--------------------------------------------------------------------* 
      |	Get Others
      *---------------------------------------------------------------------*/

  /**
   * Method to get the Others option on the header.
   */
  getOthers() {
    return this.page.locator(".dropdown-toggle", { hasText: "Others" });
  }

  /*--------------------------------------------------------------------* 
      |	Get Others Submenu
      *---------------------------------------------------------------------*/

  /**
   * Method to get the Drag and Drop dropdown sub-option from the Get Others Submenu option on the header.
   */
  getDragAndDrop() {
    return this.page.locator("a", { hasText: "Drag and Drop" });
  }

  /**
   * Method to get the Dynamic Data Loading dropdown sub-option from the Get Others Submenu option on the header.
   */
  getDynamicDataLoading() {
    return this.page.locator("a", { hasText: "Dynamic Data Loading" });
  }

  /**
   * Method to get the Charts Demo dropdown sub-option from the Get Others Submenu option on the header.
   */
  getChartsDemo() {
    return this.page.locator("a", { hasText: "Charts Demo" });
  }
}

export default HeaderElements;
