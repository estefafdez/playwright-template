import { expect } from "@playwright/test";
import { test } from "playwright-opentelemetry/fixture";
import { ApiHelpers } from "../../helpers/api-helpers";
import addApiDelay from "../../helpers/api-setup";

test.describe("API DELETE Requests - Resource Deletion", () => {
  let apiHelper: ApiHelpers;

  test.beforeEach(async ({ request, baseURL }) => {
    apiHelper = new ApiHelpers(request, baseURL || "https://reqres.in");
  });

  test.afterEach(async () => {
    await addApiDelay();
  });

  test("[31, API] should delete user and return 204 status", async () => {
    const userId = 2;

    const response = await apiHelper.makeRequest("DELETE", `/api/users/${userId}`);

    expect(response.status).toBe(204);
    apiHelper.validateResponseTime(response.responseTime);

    expect(response.body).toBeFalsy();
  });

  test("[33, API] should handle DELETE request for non-existent user", async () => {
    const nonExistentUserId = 999;

    const response = await apiHelper.makeRequest("DELETE", `/api/users/${nonExistentUserId}`);

    expect(response.status).toBe(204);
    expect(response.body).toBeFalsy();
  });
});
