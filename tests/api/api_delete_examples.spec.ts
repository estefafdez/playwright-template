import { test, expect } from "@playwright/test";
const { request } = require("@playwright/test");

test.describe("API DELETE 200 Request", () => {
  test("should get a 204 response after a DELETE request to delete a user", async ({
    request,
    baseURL,
  }) => {
    const deleteRequest = await request.delete(`${baseURL}/api/users/2`);
    expect(deleteRequest.status()).toBe(204);
  });
});
