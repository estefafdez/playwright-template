import { expect, test } from "@playwright/test";
import { ApiHelpers, TEST_DATA } from "../../helpers/api-helpers";

test.describe("API PUT Requests - Update Operations", () => {
  let apiHelper: ApiHelpers;

  test.beforeEach(async ({ request, baseURL }) => {
    apiHelper = new ApiHelpers(request, baseURL || "https://reqres.in");
  });

  test("[19, API] should update user with PUT request and validate response", async () => {
    const userId = 2;
    const updateData = {
      name: "morpheus",
      job: "zion resident",
    };

    const response = await apiHelper.makeRequest("PUT", `/api/users/${userId}`, {
      data: updateData,
    });

    expect(response.status).toBe(200);
    apiHelper.validateResponseTime(response.responseTime);

    expect(response.body.name).toEqual(updateData.name);
    expect(response.body.job).toEqual(updateData.job);

    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body.updatedAt).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);

    const updatedTime = new Date(response.body.updatedAt);
    const currentTime = new Date();
    const timeDifference = Math.abs(currentTime.getTime() - updatedTime.getTime());
    expect(timeDifference).toBeLessThan(60000);
  });

  test("[20, API] should update user with partial data", async () => {
    const userId = 5;
    const partialUpdateData = {
      job: "Senior Developer",
    };

    const response = await apiHelper.makeRequest("PUT", `/api/users/${userId}`, {
      data: partialUpdateData,
    });

    expect(response.status).toBe(200);
    expect(response.body.job).toEqual(partialUpdateData.job);
    expect(response.body).toHaveProperty("updatedAt");
  });

  test("[21, API] should update user with special characters", async () => {
    const userId = 3;
    const specialData = {
      name: "José María",
      job: "Especialista en Automatización & QA",
    };

    const response = await apiHelper.makeRequest("PUT", `/api/users/${userId}`, {
      data: specialData,
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toEqual(specialData.name);
    expect(response.body.job).toEqual(specialData.job);
  });

  test("[22, API] should handle PUT request with empty body", async () => {
    const userId = 1;

    const response = await apiHelper.makeRequest("PUT", `/api/users/${userId}`, {
      data: {},
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("updatedAt");
  });

  test("[23, API] should update user with long text fields", async () => {
    const userId = 4;
    const longTextData = {
      name: "User with a very long name that exceeds typical field lengths",
      job: "Senior Quality Assurance Engineer specializing in automated testing frameworks, continuous integration, and performance optimization",
    };

    const response = await apiHelper.makeRequest("PUT", `/api/users/${userId}`, {
      data: longTextData,
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toEqual(longTextData.name);
    expect(response.body.job).toEqual(longTextData.job);
  });

  test("[24, API] should validate response headers for PUT operations", async () => {
    const userId = 6;

    const response = await apiHelper.makeRequest("PUT", `/api/users/${userId}`, {
      data: TEST_DATA.users.validUser,
      headers: {
        "User-Agent": "Playwright-PUT-Test",
        Accept: "application/json",
      },
    });

    expect(response.status).toBe(200);
    apiHelper.validateCommonHeaders(response.headers);
  });
});
