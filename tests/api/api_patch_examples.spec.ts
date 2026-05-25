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
});
