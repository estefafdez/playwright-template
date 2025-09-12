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

  test.describe("Performance Tests", () => {
    test("[37, API] should handle concurrent GET requests efficiently", async () => {
      const userIds = [1, 2, 3, 4, 5];
      const startTime = Date.now();

      const promises = userIds.map((id) => apiHelper.makeRequest("GET", `/api/users/${id}`));

      const responses = await Promise.all(promises);
      const totalTime = Date.now() - startTime;

      responses.forEach((response, index) => {
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBe(userIds[index]);
      });

      expect(totalTime).toBeLessThan(10000);

      responses.forEach((response) => {
        expect(response.responseTime).toBeLessThan(3000);
      });
    });

    test("[38, API] should handle rate limiting gracefully", async () => {
      const requests = [];

      for (let i = 0; i < 10; i++) {
        requests.push(apiHelper.makeRequest("GET", "/api/users/1"));
      }

      const responses = await Promise.all(requests);

      const successfulResponses = responses.filter((r) => r.status === 200);

      expect(successfulResponses.length).toBeGreaterThan(0);
    });

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
