import { expect } from "@playwright/test";
import { test } from "playwright-opentelemetry/fixture";
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
    test.skip("[40, API] should handle malformed JSON gracefully", async () => {
      const response = await apiHelper.makeRequest("POST", "/api/users", {
        headers: {
          "x-api-key": "reqres-free-v1",
          "Content-Type": "application/json",
        },
        data: '{"name": "test", "job": }',
      });

      expect([400, 422, 500]).toContain(response.status);
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
