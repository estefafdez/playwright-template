import { expect, test } from "@playwright/test";
import { invalidUser, validUser } from "../../data/users/loginUsers";
import LoginPage from "../../pageobject/LoginPage";

test.describe("Login Tests", () => {
  // test.beforeEach(async ({ page }) => {
  //   const loginPage = new LoginPage(page);
  //   await loginPage.navigate();
  // });

  test.skip("should login with valid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(validUser.username, validUser.password);
    expect(await page.url()).toBe("https://example.com/dashboard");
  });
  test.skip("should show error for invalid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(invalidUser.username, invalidUser.password);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe("Invalid username or password.");
  });
});
