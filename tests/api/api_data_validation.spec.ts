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

  test.describe("Data Validation Tests", () => {
    test("[44, API] should handle special characters in user data", async () => {
      const specialCharsData = {
        name: "José María O'Connor-Smith 中文 🚀",
        job: "Senior Engineer & Team Lead @ Company™",
      };

      const response = await apiHelper.makeRequest("POST", "/api/users", {
        data: specialCharsData,
      });

      expect(response.status).toBe(201);
      expect(response.body.name).toEqual(specialCharsData.name);
      expect(response.body.job).toEqual(specialCharsData.job);
    });

    test("[45, API] should validate data persistence across operations", async () => {
      const createData = {
        name: "Test User",
        job: "QA Engineer",
      };

      const createResponse = await apiHelper.makeRequest("POST", "/api/users", {
        data: createData,
      });

      expect(createResponse.status).toBe(201);
      const userId = createResponse.body.id;

      expect(userId).toBeTruthy();

      const updateData = {
        name: "Updated User",
        job: "Senior QA Engineer",
      };

      const updateResponse = await apiHelper.makeRequest("PUT", `/api/users/${userId}`, {
        data: updateData,
      });

      expect([200, 201]).toContain(updateResponse.status);
      if (updateResponse.status === 200 || updateResponse.status === 201) {
        expect(updateResponse.body.name).toEqual(updateData.name);
        expect(updateResponse.body.job).toEqual(updateData.job);
      }
    });
  });
});
