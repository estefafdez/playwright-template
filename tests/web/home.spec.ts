import { test, Page } from "@playwright/test";
import HomePage from "../../pageobject/HomePage";

test.describe("Home Tests", () => {
  test("[46, WEB] should visit the web and check that the header is displayed properly", async ({
    page,
  }) => {
    const home = new HomePage(page);
    await home.visit();
    await home.isReady();
    await home.checkSeleniumEasyLogoIsVisible();
    await home.checkCrossBrowserTestingLogoIsVisible();
  });
});
