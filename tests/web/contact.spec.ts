import { expect, test } from "@playwright/test";
import { ContactPage } from "../../pageobject/ContactPage";

test.describe("Contact Form Tests", () => {
  let contactPage: ContactPage;

  test.beforeEach(async ({ page }) => {
    contactPage = new ContactPage(page);
    await contactPage.navigate();
  });

  test("should display contact form elements", async () => {
    await expect(contactPage.formElements.nameInput).toBeVisible();
    await expect(contactPage.formElements.emailInput).toBeVisible();
    await expect(contactPage.formElements.messageTextarea).toBeVisible();
    await expect(contactPage.formElements.submitButton).toBeVisible();
  });

  test("should submit contact form with valid data", async () => {
    const testData = {
      name: "John Doe",
      email: "john.doe@example.com",
      message: "This is a test message for automation testing.",
    };

    await contactPage.fillContactForm(testData.name, testData.email, testData.message);
    await contactPage.submitForm();

    await expect(contactPage.formElements.successMessage).toBeVisible({ timeout: 10000 });
  });

  test("should show validation error for empty required fields", async () => {
    await contactPage.submitForm();

    await expect(contactPage.formElements.requiredFieldError).toBeVisible();
  });

  test("should validate email format", async () => {
    await contactPage.fillContactForm("Test User", "invalid-email", "Test message");
    await contactPage.submitForm();

    await expect(contactPage.formElements.errorMessage).toBeVisible();
  });

  test("should reset form when reset button is clicked", async () => {
    await contactPage.fillContactForm("Test User", "test@example.com", "Test message");

    if (await contactPage.formElements.resetButton.isVisible()) {
      await contactPage.resetForm();

      await expect(contactPage.formElements.nameInput).toHaveValue("");
      await expect(contactPage.formElements.emailInput).toHaveValue("");
      await expect(contactPage.formElements.messageTextarea).toHaveValue("");
    }
  });

  test("should have proper form accessibility", async () => {
    await expect(contactPage.formElements.nameInput).toBeEditable();
    await expect(contactPage.formElements.emailInput).toBeEditable();
    await expect(contactPage.formElements.messageTextarea).toBeEditable();

    await expect(contactPage.formElements.submitButton).toBeEnabled();
  });

  test("should handle special characters in form fields", async () => {
    const specialData = {
      name: "José María O'Connor",
      email: "jose.maria@test-domain.com",
      message: "Testing special characters: äöüß @#$%^&*()_+-=[]{}|;':\",./<>?",
    };

    await contactPage.fillContactForm(specialData.name, specialData.email, specialData.message);

    await expect(contactPage.formElements.nameInput).toHaveValue(specialData.name);
    await expect(contactPage.formElements.emailInput).toHaveValue(specialData.email);
    await expect(contactPage.formElements.messageTextarea).toHaveValue(specialData.message);
  });
});
