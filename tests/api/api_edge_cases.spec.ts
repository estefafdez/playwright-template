import { expect } from "@playwright/test";
import { test } from "playwright-opentelemetry/fixture";
import { ApiHelpers } from "../../helpers/api-helpers";
import addApiDelay from "../../helpers/api-setup";

test.describe("API Edge Cases & Boundary Testing", () => {
  let apiHelper: ApiHelpers;

  test.beforeEach(async ({ request, baseURL }) => {
    apiHelper = new ApiHelpers(request, baseURL || "https://reqres.in");
  });

  test.afterEach(async () => {
    await addApiDelay();
  });

  test.describe("Authentication & Authorization Edge Cases", () => {
    test("[53, API] should handle missing authentication headers", async ({ request, baseURL }) => {
      const response = await request.get(`${baseURL}/api/users/1`);

      expect(response.status()).toBe(200);
    });

    test("[54, API] should handle invalid authentication headers", async ({ request, baseURL }) => {
      const response = await request.get(`${baseURL}/api/users/1`, {
        headers: {
          "x-api-key": "invalid-key-12345",
        },
      });

      expect([200, 401, 403]).toContain(response.status());
    });
  });

  test.describe("Data Consistency Edge Cases", () => {
    test("[58, API] should maintain data consistency across operations", async () => {
      const createData = { name: "Consistency Test", job: "Tester" };
      const createResponse = await apiHelper.makeRequest("POST", "/api/users", {
        data: createData,
        timeout: 5000,
      });

      expect(createResponse.status).toBe(201);

      const userId = createResponse.body.id;

      const putData = { name: "Updated via PUT", job: "Senior Tester" };
      const putResponse = await apiHelper.makeRequest("PUT", `/api/users/${userId}`, {
        data: putData,
        timeout: 5000,
      });

      expect(putResponse.status).toBe(200);
      if (putResponse.status === 200) {
        expect(putResponse.body.name).toBe(putData.name);
      }

      const patchData = { job: "Lead Tester" };
      const patchResponse = await apiHelper.makeRequest("PATCH", `/api/users/${userId}`, {
        data: patchData,
        timeout: 5000,
      });

      expect(patchResponse.status).toBe(200);
      if (patchResponse.status === 200) {
        expect(patchResponse.body.job).toBe(patchData.job);
      }

      const deleteResponse = await apiHelper.makeRequest("DELETE", `/api/users/${userId}`, {
        timeout: 5000,
      });
      expect(deleteResponse.status).toBe(204);
    });
  });
});
