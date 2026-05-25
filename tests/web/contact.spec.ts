import { expect, test } from "@playwright/test";
import { ContactPage } from "../../pages/ContactPage";

test.describe("Contact Page Tests", () => {
  let contactPage: ContactPage;

  test.beforeEach(async ({ page }) => {
    contactPage = new ContactPage(page);
    await contactPage.navigate();
  });

  test("should display the contact form", async () => {
    await expect(contactPage.formElements.nameInput).toBeVisible();
    await expect(contactPage.formElements.emailInput).toBeVisible();
    await expect(contactPage.formElements.messageTextarea).toBeVisible();
    await expect(contactPage.formElements.submitButton).toBeVisible();
  });

  test("should fill and submit the contact form", async () => {
    await contactPage.fillContactForm(
      "John Doe",
      "john.doe@example.com",
      "This is a test message for the contact form."
    );

    await expect(contactPage.formElements.nameInput).toHaveValue("John Doe");
    await expect(contactPage.formElements.emailInput).toHaveValue("john.doe@example.com");
    await expect(contactPage.formElements.messageTextarea).toHaveValue(
      "This is a test message for the contact form."
    );

    await contactPage.submitForm();
  });

  test("should reset the form and clear all fields", async () => {
    await contactPage.fillContactForm(
      "Test User",
      "test@example.com",
      "Message to be cleared."
    );

    await contactPage.resetForm();

    await expect(contactPage.formElements.nameInput).toHaveValue("");
    await expect(contactPage.formElements.emailInput).toHaveValue("");
    await expect(contactPage.formElements.messageTextarea).toHaveValue("");
  });

  test("should show all form fields as editable", async () => {
    await expect(contactPage.formElements.nameInput).toBeEditable();
    await expect(contactPage.formElements.emailInput).toBeEditable();
    await expect(contactPage.formElements.messageTextarea).toBeEditable();
  });

  test("should handle special characters in form fields", async () => {
    const specialName = "José María O'Connor-Smith";
    const specialEmail = "jose.maria@test-domain.co.uk";
    const specialMessage = "Testing: äöüßñç @#$%^&*()";

    await contactPage.fillContactForm(specialName, specialEmail, specialMessage);

    await expect(contactPage.formElements.nameInput).toHaveValue(specialName);
    await expect(contactPage.formElements.emailInput).toHaveValue(specialEmail);
    await expect(contactPage.formElements.messageTextarea).toHaveValue(specialMessage);
  });
});
