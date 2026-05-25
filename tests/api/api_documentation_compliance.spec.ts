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

  test.describe("API Documentation Compliance", () => {
    test("[46, API] should validate all endpoints return consistent response structure", async () => {
      const endpoints = [
        { method: "GET" as const, path: "/api/users/1" },
        { method: "GET" as const, path: "/api/users" },
        { method: "GET" as const, path: "/api/unknown" },
      ];

      for (const endpoint of endpoints) {
        const response = await apiHelper.makeRequest(endpoint.method, endpoint.path);

        expect(response.status).toBe(200);

        if (response.body.support) {
          apiHelper.validateSupportSchema(response.body.support);
        }

        expect(response.headers["content-type"]).toContain("application/json");
      }
    });
  });
});
