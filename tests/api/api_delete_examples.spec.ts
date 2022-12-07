import { test, expect } from "@playwright/test";
import { qase } from "playwright-qase-reporter/dist/playwright";

test.describe("API DELETE 200 Request", () => {
  test(
    qase(
      [15],
      "[15, API] should get a 204 response after a DELETE request to delete a user"
    ),
    async ({ request, baseURL }) => {
      const response = await request.delete(`${baseURL}/api/users/2`);
      expect(response.status()).toBe(204);
    }
  );
});
