import { expect, test } from "@playwright/test";
import { ApiHelpers, addApiDelay } from "../../helpers/api-helpers";

test.describe("API Edge Cases & Boundary Testing", () => {
  let apiHelper: ApiHelpers;

  test.beforeEach(async ({ request, baseURL }) => {
    apiHelper = new ApiHelpers(request, baseURL || "https://reqres.in");
  });

  test.afterEach(async () => {
    await addApiDelay();
  });

  test.describe("Boundary Value Testing", () => {
    test("[48, API] should handle minimum and maximum user IDs", async () => {
      const minResponse = await apiHelper.makeRequest("GET", "/api/users/1");
      expect(minResponse.status).toBe(200);
      expect(minResponse.body.data.id).toBe(1);

      const maxResponse = await apiHelper.makeRequest("GET", "/api/users/12");
      expect(maxResponse.status).toBe(200);
      expect(maxResponse.body.data.id).toBe(12);

      const beyondMaxResponse = await apiHelper.makeRequest("GET", "/api/users/999");
      expect(beyondMaxResponse.status).toBe(404);

      const zeroResponse = await apiHelper.makeRequest("GET", "/api/users/0");
      expect([404, 400]).toContain(zeroResponse.status);

      const negativeResponse = await apiHelper.makeRequest("GET", "/api/users/-1");
      expect([404, 400]).toContain(negativeResponse.status);
    });

    test("[49, API] should handle page boundary values", async () => {
      const firstPageResponse = await apiHelper.makeRequest("GET", "/api/users", {
        params: { page: "1" },
      });
      expect(firstPageResponse.status).toBe(200);
      if (firstPageResponse.status === 200) {
        expect(firstPageResponse.body.page).toBe(1);
      }

      const lastPageResponse = await apiHelper.makeRequest("GET", "/api/users", {
        params: { page: "2" },
      });
      expect(lastPageResponse.status).toBe(200);
      if (lastPageResponse.status === 200) {
        expect(lastPageResponse.body.page).toBe(2);
      }

      const beyondLastResponse = await apiHelper.makeRequest("GET", "/api/users", {
        params: { page: "100" },
      });
      expect(beyondLastResponse.status).toBe(200);
      if (beyondLastResponse.status === 200) {
        expect(beyondLastResponse.body.data).toEqual([]);
      }

      const zeroPageResponse = await apiHelper.makeRequest("GET", "/api/users", {
        params: { page: "0" },
      });
      expect(zeroPageResponse.status).toBe(200);

      const negativePageResponse = await apiHelper.makeRequest("GET", "/api/users", {
        params: { page: "-1" },
      });
      expect(negativePageResponse.status).toBe(200);
    });
  });

  test.describe("Input Validation Edge Cases", () => {
    test("[50, API] should handle various data types in user creation", async () => {
      const testCases = [
        { name: 123, job: "Engineer" },
        { name: true, job: "Engineer" },
        { name: null, job: "Engineer" },
        { name: "", job: "Engineer" },
        { name: "   ", job: "Engineer" },
        { name: "User", job: 456 },
        { name: "User", job: null },
        { name: "User", job: "" },
      ];

      for (const testData of testCases) {
        const response = await apiHelper.makeRequest("POST", "/api/users", {
          data: testData,
        });

        expect([201, 400, 422]).toContain(response.status);

        if (response.status === 201) {
          expect(response.body).toHaveProperty("id");
          expect(response.body).toHaveProperty("createdAt");
        }
      }
    });

    test("[51, API] should handle Unicode and emoji in user data", async () => {
      const unicodeTestCases = [
        { name: "用户", job: "工程师" },
        { name: "Пользователь", job: "Инженер" },
        { name: "مستخدم", job: "مهندس" },
        { name: "🚀👨‍💻", job: "🔧⚙️" },
        { name: "User\n\t\r", job: "Engineer\n" },
        { name: "User\\nTest", job: "Engineer\\tTest" },
      ];

      for (const testData of unicodeTestCases) {
        const response = await apiHelper.makeRequest("POST", "/api/users", {
          data: testData,
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
      }
    });

    test("[52, API] should handle extremely long field values", async () => {
      const longString = "a".repeat(1000);
      const extremeLongString = "b".repeat(10000);

      const testCases = [
        { name: longString, job: "Engineer" },
        { name: "User", job: longString },
        { name: extremeLongString, job: "Engineer" },
      ];

      for (const testData of testCases) {
        const response = await apiHelper.makeRequest("POST", "/api/users", {
          data: testData,
        });

        expect([201, 413, 422]).toContain(response.status);
      }
    });
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

    test("[55, API] should handle various header formats", async () => {
      const headerTestCases: Record<string, string>[] = [
        { "x-api-key": "" },
        { "x-api-key": "   " },
        { "X-API-KEY": "reqres-free-v1" },
        { "x-api-key": "reqres-free-v1", authorization: "Bearer token" },
      ];

      for (const headers of headerTestCases) {
        const response = await apiHelper.makeRequest("GET", "/api/users/1", {
          headers,
        });

        expect([200, 400, 401]).toContain(response.status);
      }
    });
  });

  test.describe("Network & Timeout Edge Cases", () => {
    test("[56, API] should handle delayed responses appropriately", async () => {
      const delayValues = ["1", "2", "3", "5"];

      for (const delay of delayValues) {
        const startTime = Date.now();
        const response = await apiHelper.makeRequest("GET", "/api/users/1", {
          params: { delay },
        });
        const actualDelay = Date.now() - startTime;

        expect(response.status).toBe(200);

        if (response.status === 200) {
          const expectedDelay = parseInt(delay) * 1000;
          expect(actualDelay).toBeGreaterThan(expectedDelay - 500);
          expect(actualDelay).toBeLessThan(expectedDelay + 2000);
        }
      }
    });

    test("[57, API] should handle concurrent requests to same endpoint", async () => {
      const concurrentRequests = 5;
      const requests = Array.from({ length: concurrentRequests }, () => apiHelper.makeRequest("GET", "/api/users/1"));

      const responses = await Promise.all(requests);

      responses.forEach((response) => {
        expect(response.status).toBe(200);
        if (response.status === 200) {
          expect(response.body.data.id).toBe(1);
        }
      });

      const successfulResponses = responses.filter((r) => r.status === 200);
      if (successfulResponses.length > 1) {
        const firstResponse = JSON.stringify(successfulResponses[0].body);
        successfulResponses.forEach((response) => {
          expect(JSON.stringify(response.body)).toBe(firstResponse);
        });
      }
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

    test("[59, API] should handle rapid successive operations", async () => {
      const userId = "rapid-test";
      const operations = [
        () => apiHelper.makeRequest("POST", "/api/users", { data: { name: "Rapid Test", job: "Engineer" } }),
        () => apiHelper.makeRequest("PUT", `/api/users/${userId}`, { data: { name: "Updated", job: "Senior Engineer" } }),
        () => apiHelper.makeRequest("PATCH", `/api/users/${userId}`, { data: { job: "Lead Engineer" } }),
        () => apiHelper.makeRequest("DELETE", `/api/users/${userId}`),
      ];

      for (const operation of operations) {
        const response = await operation();
        expect([200, 201, 204]).toContain(response.status);
      }
    });
  });
});
