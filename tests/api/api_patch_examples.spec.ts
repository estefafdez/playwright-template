import { expect, test } from "@playwright/test";
import { ApiHelpers } from "../../helpers/api-helpers";
import addApiDelay from "../../helpers/api-setup";

test.describe("API PATCH Requests - Partial Updates", () => {
  let apiHelper: ApiHelpers;

  test.beforeEach(async ({ request, baseURL }) => {
    apiHelper = new ApiHelpers(request, baseURL || "https://reqres.in");
  });

  test.afterEach(async () => {
    await addApiDelay();
  });

  test("[25, API] should partially update user with PATCH request", async () => {
    const userId = 2;
    const patchData = {
      name: "morpheus",
      job: "zion resident",
    };

    const response = await apiHelper.makeRequest("PATCH", `/api/users/${userId}`, {
      data: patchData,
    });

    expect(response.status).toBe(200);
    apiHelper.validateResponseTime(response.responseTime);

    expect(response.body.name).toEqual(patchData.name);
    expect(response.body.job).toEqual(patchData.job);
    expect(response.body).toHaveProperty("updatedAt");

    expect(response.body.updatedAt).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
  });

  test("[26, API] should update only job field with PATCH", async () => {
    const userId = 3;
    const jobOnlyUpdate = {
      job: "Lead Developer",
    };

    const response = await apiHelper.makeRequest("PATCH", `/api/users/${userId}`, {
      data: jobOnlyUpdate,
    });

    expect(response.status).toBe(200);
    expect(response.body.job).toEqual(jobOnlyUpdate.job);
    expect(response.body).not.toHaveProperty("name");
    expect(response.body).toHaveProperty("updatedAt");
  });

  test("[27, API] should update only name field with PATCH", async () => {
    const userId = 4;
    const nameOnlyUpdate = {
      name: "Alexandra",
    };

    const response = await apiHelper.makeRequest("PATCH", `/api/users/${userId}`, {
      data: nameOnlyUpdate,
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toEqual(nameOnlyUpdate.name);
    expect(response.body).not.toHaveProperty("job");
    expect(response.body).toHaveProperty("updatedAt");
  });

  test("[28, API] should handle PATCH with multiple field updates", async () => {
    const userId = 5;
    const multiFieldUpdate = {
      name: "Neo Anderson",
      job: "The One",
      location: "Zion",
      status: "Active",
    };

    const response = await apiHelper.makeRequest("PATCH", `/api/users/${userId}`, {
      data: multiFieldUpdate,
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toEqual(multiFieldUpdate.name);
    expect(response.body.job).toEqual(multiFieldUpdate.job);
    expect(response.body.location).toEqual(multiFieldUpdate.location);
    expect(response.body.status).toEqual(multiFieldUpdate.status);
  });

  test("[29, API] should handle PATCH with null values", async () => {
    const userId = 6;
    const nullValueUpdate = {
      name: "Test User",
      job: null,
    };

    const response = await apiHelper.makeRequest("PATCH", `/api/users/${userId}`, {
      data: nullValueUpdate,
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toEqual(nullValueUpdate.name);
    expect(response.body.job).toBeNull();
  });

  test("[30, API] should validate PATCH vs PUT differences", async () => {
    const userId = 7;
    const testData = { job: "Test Engineer" };

    const patchResponse = await apiHelper.makeRequest("PATCH", `/api/users/${userId}`, {
      data: testData,
    });

    const putResponse = await apiHelper.makeRequest("PUT", `/api/users/${userId}`, {
      data: testData,
    });

    expect(patchResponse.status).toBe(200);
    expect(putResponse.status).toBe(200);

    expect(patchResponse.body.job).toEqual(testData.job);
    expect(putResponse.body.job).toEqual(testData.job);

    expect(patchResponse.body).toHaveProperty("updatedAt");
    expect(putResponse.body).toHaveProperty("updatedAt");
  });
});
