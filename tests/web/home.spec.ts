import { test, expect } from "@playwright/test";
import HomePage from "../../pageobject/HomePage";

test.describe("Home Tests", () => {
  const home = new HomePage();

  test("[46, WEB] should visit the web and check that the header is displayed properly", async () => {
    home.visit();
    home.isReady();
    //home.checkSeleniumEasyLogoIsVisible();
    //home.checkCrossBrowserTestingLogoIsVisible();
  });
});
