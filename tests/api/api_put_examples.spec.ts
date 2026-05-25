import { expect, test } from "@playwright/test";
import { ApiHelpers } from "../../helpers/api-helpers";
import addApiDelay from "../../helpers/api-setup";

test.describe("API PUT Requests - Update Operations", () => {
  let apiHelper: ApiHelpers;

  test.beforeEach(async ({ request, baseURL }) => {
    apiHelper = new ApiHelpers(request, baseURL || "https://reqres.in");
  });

  test.afterEach(async () => {
    await addApiDelay();
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

  test("[22, API] should handle PUT request with empty body", async () => {
    const userId = 1;

    const response = await apiHelper.makeRequest("PUT", `/api/users/${userId}`, {
      data: {},
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("updatedAt");
  });
});
