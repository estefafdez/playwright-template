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

  test.describe("Performance Tests", () => {
    test("[39, API] should validate response times under load", async () => {
      const responses = [];

      for (let i = 1; i <= 5; i++) {
        const response = await apiHelper.makeRequest("GET", `/api/users/${i}`);
        responses.push(response);
        expect(response.status).toBe(200);
      }

      const avgResponseTime = responses.reduce((sum, r) => sum + r.responseTime, 0) / responses.length;

      expect(avgResponseTime).toBeLessThan(2000);

      responses.forEach((response) => {
        expect(response.responseTime).toBeLessThan(5000);
      });
    });
  });
});
