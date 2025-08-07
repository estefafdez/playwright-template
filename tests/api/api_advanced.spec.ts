import { expect, test } from "@playwright/test";
import { ApiHelpers } from "../../helpers/api-helpers";

test.describe("API Advanced Testing - Performance & Security", () => {
  let apiHelper: ApiHelpers;

  test.beforeEach(async ({ request, baseURL }) => {
    apiHelper = new ApiHelpers(request, baseURL || "https://reqres.in");
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
      const rateLimitedResponses = responses.filter((r) => r.status === 429);

      expect(successfulResponses.length).toBeGreaterThan(0);

      rateLimitedResponses.forEach((response) => {
        expect(response.status).toBe(429);
      });
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

  test.describe("Data Validation Tests", () => {
    test("[43, API] should validate email format in registration", async () => {
      const invalidEmails = ["invalid-email", "@domain.com", "user@", "user..user@domain.com", "user@domain", ""];

      for (const email of invalidEmails) {
        const response = await apiHelper.makeRequest("POST", "/api/register", {
          data: { email, password: "password123" },
        });

        expect([400, 422]).toContain(response.status);
      }
    });

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

    test("[47, API] should validate API versioning consistency", async () => {
      const apiEndpoints = ["/api/users", "/api/users/1", "/api/unknown", "/api/unknown/1"];

      for (const endpoint of apiEndpoints) {
        const response = await apiHelper.makeRequest("GET", endpoint);

        expect(response.status).toBe(200);

        expect(response.headers["server"]).toBeTruthy();
        expect(response.headers["content-type"]).toContain("application/json");
      }
    });
  });
});
