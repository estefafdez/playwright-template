import { expect, test } from "@playwright/test";
import { ApiHelpers } from "../../helpers/api-helpers";
import { addApiDelay } from "./api-setup";

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

  test("[32, API] should delete different users successfully", async () => {
    const userIds = [1, 3, 5, 10];

    for (const userId of userIds) {
      const response = await apiHelper.makeRequest("DELETE", `/api/users/${userId}`);

      expect(response.status).toBe(204);
      apiHelper.validateResponseTime(response.responseTime);
      expect(response.body).toBeFalsy();
    }
  });

  test("[33, API] should handle DELETE request for non-existent user", async () => {
    const nonExistentUserId = 999;

    const response = await apiHelper.makeRequest("DELETE", `/api/users/${nonExistentUserId}`);

    expect(response.status).toBe(204);
    expect(response.body).toBeFalsy();
  });

  test("[34, API] should validate DELETE response headers", async () => {
    const userId = 4;

    const response = await apiHelper.makeRequest("DELETE", `/api/users/${userId}`, {
      headers: {
        "User-Agent": "Playwright-DELETE-Test",
        Accept: "application/json",
      },
    });

    expect(response.status).toBe(204);

    expect(response.headers["server"]).toBeTruthy();
    if (response.headers["cache-control"]) {
      expect(response.headers["cache-control"]).toBeTruthy();
    }
  });

  test("[35, API] should perform multiple DELETE operations in sequence", async () => {
    const userIds = [6, 7, 8];
    const responses = [];

    for (const userId of userIds) {
      const startTime = Date.now();
      const response = await apiHelper.makeRequest("DELETE", `/api/users/${userId}`);
      const endTime = Date.now();

      responses.push({
        userId,
        status: response.status,
        responseTime: endTime - startTime,
      });

      expect(response.status).toBe(204);
    }

    expect(responses).toHaveLength(userIds.length);
    responses.forEach((resp) => {
      expect(resp.status).toBe(204);
      expect(resp.responseTime).toBeLessThan(5000);
    });
  });

  test("[36, API] should handle DELETE with custom headers", async () => {
    const userId = 9;

    const response = await apiHelper.makeRequest("DELETE", `/api/users/${userId}`, {
      headers: {
        "X-Custom-Header": "delete-test",
        Authorization: "Bearer fake-token",
        "X-Request-ID": "delete-test-001",
      },
    });

    expect(response.status).toBe(204);
    expect(response.body).toBeFalsy();
  });
});
