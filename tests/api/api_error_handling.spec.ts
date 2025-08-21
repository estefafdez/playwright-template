import { expect, test } from "@playwright/test";
import { ApiHelpers } from "../../helpers/api-helpers";
import addApiDelay from "../../helpers/api-setup";

test.describe("API Advanced Testing - Performance & Security", () => {
  let apiHelper: ApiHelpers;

  test.beforeEach(async ({ request, baseURL }) => {
    apiHelper = new ApiHelpers(request, baseURL || "https://reqres.in");
  });

  test.afterEach(async () => {
    await addApiDelay(1500);
  });

  test.describe("Error Handling Tests", () => {
    test("[40, API] should handle malformed JSON gracefully", async () => {
      const response = await apiHelper.makeRequest("POST", "/api/users", {
        headers: {
          "x-api-key": "reqres-free-v1",
          "Content-Type": "application/json",
        },
        data: '{"name": "test", "job": }',
      });

      expect([400, 422, 500]).toContain(response.status);
    });

    test("[41, API] should validate HTTP method restrictions", async () => {
      const invalidMethods = [
        { method: "PATCH" as const, endpoint: "/api/login" },
        { method: "PUT" as const, endpoint: "/api/register" },
      ];

      for (const { method, endpoint } of invalidMethods) {
        const response = await apiHelper.makeRequest(method, endpoint, {
          data: { email: "test@test.com", password: "test" },
        });

        expect([405, 404, 400]).toContain(response.status);
      }
    });

    test("[42, API] should handle large payload sizes", async () => {
      const largeString = "x".repeat(10000);

      const response = await apiHelper.makeRequest("POST", "/api/users", {
        data: {
          name: largeString,
          job: "Test with large data",
          description: largeString,
        },
      });

      expect([201, 413, 422]).toContain(response.status);

      if (response.status === 201) {
        expect(response.body.name).toBeTruthy();
      }
    });
  });
});
