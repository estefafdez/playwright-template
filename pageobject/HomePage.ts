import { expect, Page } from "@playwright/test";
import { baseURL } from "../config/baseURL";
import FooterElements from "../elements/FooterElements";
import HeaderElements from "../elements/HeaderElements";
import MenuElements from "../elements/MenuElements";
import BootstrapAlertsPage from "./alertsandmodals/BootstrapAlertsPage";
import BootstrapModalsPage from "./alertsandmodals/BootstrapModalsPage";
import FileDownloadPage from "./alertsandmodals/FileDownloadPage";
import JavascriptAlertsPage from "./alertsandmodals/JavascriptAlertsPage";
import ProgressBarModalPage from "./alertsandmodals/ProgressBarModalPage";
import WindowPopupModalPage from "./alertsandmodals/WindowPopupModalPage";
import BootstrapDatePickerPage from "./datepickers/BootstrapDatePickerPage";
import JQueryDatePickerPage from "./datepickers/JQueryDatePickerPage";
import AjaxFormSubmitPage from "./inputforms/AjaxFormSubmitPage";
import CheckboxDemoPage from "./inputforms/CheckboxDemoPage";
import InputFormSubmitPage from "./inputforms/InputFormSubmitPage";
import JQuerySelectDropdownPage from "./inputforms/JQuerySelectDropdownPage";
import RadioButtonsDemoPage from "./inputforms/RadioButtonsDemoPage";
import SelectDropdownListPage from "./inputforms/SelectDropdownListPage";
import SimpleFormDemoPage from "./inputforms/SimpleFormDemoPage";
import BootstrapListPage from "./listbox/BootstrapListPage";
import DataListFilterPage from "./listbox/DataListFilterPage";
import JQueryListBoxPage from "./listbox/JQueryListBoxPage";
import ChartsDemoDropdownPage from "./others/ChartsDemoDropdownPage";
import DragAndDropPage from "./others/DragAndDropPage";
import DynamicDataLoadingPage from "./others/DynamicDataLoadingPage";
import BootstrapProgressBarPage from "./progressbar/BootstrapProgressBarPage";
import DragAndDropSlidersPage from "./progressbar/DragAndDropSlidersPage";
import JQueryDownloadProgressBarsPage from "./progressbar/JQueryDownloadProgressBarsPage";
import TableDataDownloadPage from "./table/TableDataDownloadPage";
import TableDataSearchPage from "./table/TableDataSearchPage";
import TableFilterPage from "./table/TableFilterPage";
import TablePaginationPage from "./table/TablePaginationPage";
import TableSortAndSearchPage from "./table/TableSortAndSearchPage";

export class HomePage {
  footer: any;
  header: any;
  menu: any;
  readonly page: Page;

  /**
   * Homepage constructor. We need to create a new instance of the Header and the Footer.
   */
  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderElements(this.page);
    this.footer = new FooterElements(this.page);
    this.menu = new MenuElements(this.page);
  }

  /**
   * Method to visit the webpage URL
   */
  async visit() {
    await this.page.goto(baseURL.web);
  }

  /**
   * Method to check if the Homepage is loaded (include the Header and Footer elements)
   */
  async isReady() {
    this.header.isReady();
    expect(this.page.url()).toEqual("https://demo.seleniumeasy.com/");
    await expect(this.page.locator("body > :nth-child(2)")).toBeVisible();
    await expect(this.page.locator("#easycont > :nth-child(1)")).toBeVisible();
    this.footer.isReady();
  }

  /**
   * Method to click to close the popup once is displayed.
   */
  async closePopUp() {
    const checkPopup = this.page.locator("#at-cv-lightbox-header");

    if (checkPopup) {
      await this.page.click("#at-cv-lightbox-header");
    }
  }

  /*--------------------------------------------------------------------*
	|      CHECK METHODS                                    
	*---------------------------------------------------------------------*/

  /*-----------------------------HEADER---------------------------------*/

  /**
   * Check that the Selenium Easy Logo is visible.
   */
  checkSeleniumEasyLogoIsVisible() {
    return expect(this.header.seleniumEasyLogo).toBeVisible();
  }

  /**
   * Check that the CrossBrowserTesting Logo is visible.
   */
  checkCrossBrowserTestingLogoIsVisible() {
    return expect(this.header.crossBrowserTestingLogo).toBeVisible();
  }

  /*---------------------------MENU LIST--------------------------------*/

  /**
   * Check that the All examples menu option is visible.
   */
  checkAllExamplesMenuOptionIsVisible() {
    return this.menu.getAllExamplesMenuOption().toBeVisible();
  }

  /**
   * Check that the Input Form menu option is visible.
   */
  checkInputFormMenuOptionIsVisible() {
    return this.menu.getInputFormMenuOption().toBeVisible();
  }

  /**
   * Check that the Date Pickers menu option is visible.
   */
  checkDatePickersMenuOptionIsVisible() {
    return this.menu.getDatePickersMenuOption().toBeVisible();
  }

  /**
   * Check that the Table menu option is visible.
   */
  checkTableMenuOptionIsVisible() {
    return this.menu.getTableMenuOption().toBeVisible();
  }

  /**
   * Check that the Progress Bars & Sliders menu option is visible.
   */
  checkProgressBarsSlidersMenuOptionIsVisible() {
    return this.menu.getProgressBarsSlidersMenuOption().toBeVisible();
  }

  /**
   * Check that the Alerts & Modals menu option is visible.
   */
  checkAlertsModalsmMenuOptionIsVisible() {
    return this.menu.getAlertsModalsmMenuOption().toBeVisible();
  }

  /**
   * Check that the List Box menu option is visible.
   */
  checkListBoxMenuOptionIsVisible() {
    return this.menu.getListBoxMenuOption().toBeVisible();
  }

  /**
   * Check that the Others menu option is visible.
   */
  checkOthersMenuOptionIsVisible() {
    return this.menu.getOthersMenuOption().toBeVisible();
  }

  /*--------------------------------------------------------------------* 
  |	Input Form Submenu
  *---------------------------------------------------------------------*/

  /**
   * Method to click on the Simple Form Demo option on the header menu.
   */
  clickOnSimpleFormDemoLinkHeader() {
    this.header.getInputForm().click();
    this.header.getSimpleFormDemo().click();

    return new SimpleFormDemoPage(this.page);
  }

  /**
   * Method to click on the Checkbox Demo option on the header menu.
   */
  clickOnCheckboxDemoLinkHeader() {
    this.header.getInputForm().click();
    this.header.getCheckboxDemo().click();

    return new CheckboxDemoPage(this.page);
  }

  /**
   * Method to click on the Radio Buttons Demo option on the header menu.
   */
  clickOnRadioButtonsDemoLinkHeader() {
    this.header.getInputForm().click();
    this.header.getRadioButtonsDemo().click();

    return new RadioButtonsDemoPage(this.page);
  }

  /**
   * Method to click on the Select Dropdown List option on the header menu.
   */
  clickOnSelectDropdownListLinkHeader() {
    this.header.getInputForm().click();
    this.header.getSelectDropdownList().click();

    return new SelectDropdownListPage(this.page);
  }

  /**
   * Method to click on the Input Form Submit option on the header menu.
   */
  clickOnInputFormSubmitLinkHeader() {
    this.header.getInputForm().click();
    this.header.getInputFormSubmit().click();

    return new InputFormSubmitPage(this.page);
  }

  /**
   * Method to click on the Ajax Form Submit option on the header menu.
   */
  clickOnAjaxFormSubmitLinkHeader() {
    this.header.getInputForm().click();
    this.header.getAjaxFormSubmit().click();

    return new AjaxFormSubmitPage(this.page);
  }

  /**
   * Method to click on the JQuery Select option on the header menu.
   */
  clickOnJqueryFormSubmitLinkHeader() {
    this.header.getInputForm().click();
    this.header.getJQuerySelectDropdown().click();

    return new JQuerySelectDropdownPage(this.page);
  }

  /*--------------------------------------------------------------------* 
  |	Date Pickers Submenu
  *---------------------------------------------------------------------*/

  /**
   * Method to click on the Bootstrap Date Picker option on the header menu.
   */
  clickOnBootstrapDatePickerLinkHeader() {
    this.header.getDatePickers().click();
    this.header.getBootstrapDatePicker().click();

    return new BootstrapDatePickerPage(this.page);
  }

  /**
   * Method to click on the JQuery Date Picker option on the header menu.
   */
  clickOnJQueryDatePickerLinkHeader() {
    this.header.getDatePickers().click();
    this.header.getJQueryDatePicker().click();

    return new JQueryDatePickerPage(this.page);
  }

  /*--------------------------------------------------------------------* 
  |	Table Submenu
  *---------------------------------------------------------------------*/

  /**
   * Method to click on the Table Pagination option on the header menu.
   */
  clickOnTablePaginationLinkHeader() {
    this.header.getTable().click();
    this.header.getTablePagination().click();

    return new TablePaginationPage(this.page);
  }

  /**
   * Method to click on the Table Data Search option on the header menu.
   */
  clickOnTableDataSearchLinkHeader() {
    this.header.getTable().click();
    this.header.getTableDataSearch().click();

    return new TableDataSearchPage(this.page);
  }

  /**
   * Method to click on the Table Filter option on the header menu.
   */
  clickOnTableFilterLinkHeader() {
    this.header.getTable().click();
    this.header.getTableFilter().click();

    return new TableFilterPage(this.page);
  }

  /**
   * Method to click on the Table Sort & Search option on the header menu.
   */
  clickOnTableSortAndSearchLinkHeader() {
    this.header.getTable().click();
    this.header.getTableSortAndSearch().click();

    return new TableSortAndSearchPage(this.page);
  }

  /**
   * Method to click on the Table Data Download option on the header menu.
   */
  clickOnTableDataDownloadLinkHeader() {
    this.header.getTable().click();
    this.header.getTableDataDownload().click();

    return new TableDataDownloadPage(this.page);
  }

  /*--------------------------------------------------------------------* 
  |	Demo Home
  *---------------------------------------------------------------------*/

  /**
   * Method to click on the Demo Home Link option on the header menu.
   */
  clickOnDemoHomeLinkHeader() {
    this.header.getDemoHome().click();
  }

  /*--------------------------------------------------------------------* 
  |	Progress Bar Submenu
  *---------------------------------------------------------------------*/

  /**
   * Method to click on the JQuery Download Progress bars option on the header menu.
   */
  clickOnJQueryDownloadProgressBarsLinkHeader() {
    this.header.getProgressBar().click();
    this.header.getJQueryDownloadProgressBars().click();

    return new JQueryDownloadProgressBarsPage(this.page);
  }

  /**
   * Method to click on the Bootstrap Progress bar option on the header menu.
   */
  clickOnBootstrapProgressBarLinkHeader() {
    this.header.getProgressBar().click();
    this.header.getBootstrapProgressBar().click();

    return new BootstrapProgressBarPage(this.page);
  }

  /**
   * Method to click on the Drag & Drop Sliders option on the header menu.
   */
  clickOnDragAndDropSlidersLinkHeader() {
    this.header.getProgressBar().click();
    this.header.getDragAndDropSliders().click();

    return new DragAndDropSlidersPage(this.page);
  }

  /*--------------------------------------------------------------------* 
  |	Alerts & Modals Submenu
  *---------------------------------------------------------------------*/

  /**
   * Method to click on the Bootstrap Alerts option on the header menu.
   */
  clickOnBootstrapAlertsLinkHeader() {
    this.header.getAlertsAndModals().click();
    this.header.getBootstrapAlerts().click();

    return new BootstrapAlertsPage(this.page);
  }

  /**
   * Method to click on the Bootstrap Modals option on the header menu.
   */
  clickOnBootstrapModalsLinkHeader() {
    this.header.getAlertsAndModals().click();
    this.header.getBootstrapModals().click();

    return new BootstrapModalsPage(this.page);
  }

  /**
   * Method to click on the Window Popup Modal option on the header menu.
   */
  clickOnWindowPopupModalLinkHeader() {
    this.header.getAlertsAndModals().click();
    this.header.getWindowPopupModal().click();

    return new WindowPopupModalPage(this.page);
  }

  /**
   * Method to click on the Progress Bar Modal option on the header menu.
   */
  clickOnProgressBarModalLinkHeader() {
    this.header.getAlertsAndModals().click();
    this.header.getProgressBarModal().click();

    return new ProgressBarModalPage(this.page);
  }

  /**
   * Method to click on the Javascript Alerts option on the header menu.
   */
  clickOnJavascriptAlertsLinkHeader() {
    this.header.getAlertsAndModals().click();
    this.header.getJavascriptAlerts().click();

    return new JavascriptAlertsPage(this.page);
  }

  /**
   * Method to click on the File Download option on the header menu.
   */
  clickOnFileDownloadLinkHeader() {
    this.header.getAlertsAndModals().click();
    this.header.getFileDownload().click();

    return new FileDownloadPage(this.page);
  }

  /*--------------------------------------------------------------------* 
  |	List Box Submenu
  *---------------------------------------------------------------------*/

  /**
   * Method to click on the Bootstrap List option on the header menu.
   */
  clickOnBootstrapListLinkHeader() {
    this.header.getListBox().click();
    this.header.getBootstrapListBox().click();

    return new BootstrapListPage(this.page);
  }

  /**
   * Method to click on the JQuery List Box option on the header menu.
   */
  clickOnJQueryListBoxLinkHeader() {
    this.header.getListBox().click();
    this.header.getJQueryListBox().click();

    return new JQueryListBoxPage(this.page);
  }

  /**
   * Method to click on the Data List Filter option on the header menu.
   */
  clickOnDataListFilterLinkHeader() {
    this.header.getListBox().click();
    this.header.getDataListFilter().click();

    return new DataListFilterPage(this.page);
  }

  /*--------------------------------------------------------------------* 
  |	Get Others Submenu
  *---------------------------------------------------------------------*/

  /**
   * Method to click on the Drag and Drop option on the header menu.
   */
  clickOnDragAndDropLinkHeader() {
    this.header.getOthers().click();
    this.header.getDragAndDrop().click();

    return new DragAndDropPage(this.page);
  }

  /**
   * Method to click on the Dynamic Data Loading option on the header menu.
   */
  clickOnDynamicDataLoadingLinkHeader() {
    this.header.getOthers().click();
    this.header.getDynamicDataLoading().click();

    return new DynamicDataLoadingPage(this.page);
  }

  /**
   * Method to click on the Charts Demo dropdown option on the header menu.
   */
  clickOnChartsDemoDropdownLinkHeader() {
    this.header.getOthers().click();
    this.header.getChartsDemo().click();

    return new ChartsDemoDropdownPage(this.page);
  }
}

export default HomePage;
