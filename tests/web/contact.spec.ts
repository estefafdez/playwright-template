import { expect } from "@playwright/test";
import { test } from "playwright-opentelemetry/fixture";
import { ContactPage } from "../../pages/ContactPage";
import { testData } from "../../data/testData";

test.describe.skip("Contact Page Tests", () => {
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

  test("should fill and submit the contact form with valid data", async () => {
    const { name, email, message } = testData.validUsers[0];

    await contactPage.fillContactForm(name, email, message);

    await expect(contactPage.formElements.nameInput).toHaveValue(name);
    await expect(contactPage.formElements.emailInput).toHaveValue(email);
    await expect(contactPage.formElements.messageTextarea).toHaveValue(message);

    await contactPage.submitForm();
  });

  test("should reset the form and clear all fields", async () => {
    const { name, email, message } = testData.validUsers[1];

    await contactPage.fillContactForm(name, email, message);
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
    const { name, email, message } = testData.specialCharacters;

    await contactPage.fillContactForm(name, email, message);

    await expect(contactPage.formElements.nameInput).toHaveValue(name);
    await expect(contactPage.formElements.emailInput).toHaveValue(email);
    await expect(contactPage.formElements.messageTextarea).toHaveValue(message);
  });
});
