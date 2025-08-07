import { expect, test } from "@playwright/test";
import { ApiHelpers } from "../../helpers/api-helpers";
import { addApiDelay } from "./api-setup";

test.describe("API GET Requests - Users and Resources", () => {
  let apiHelper: ApiHelpers;

  test.beforeEach(async ({ request, baseURL }) => {
    apiHelper = new ApiHelpers(request, baseURL || "https://reqres.in");
  });

  test.afterEach(async () => {
    await addApiDelay();
  });

  test("[1, API] should get paginated users list with proper schema validation", async () => {
    const response = await apiHelper.makeRequest("GET", "/api/users", {
      params: { page: "2" },
    });

    expect(response.status).toBe(200);

    apiHelper.validateResponseTime(response.responseTime);
    apiHelper.validateCommonHeaders(response.headers);

    apiHelper.validatePaginationSchema(response.body);
    expect(response.body.page).toEqual(2);
    expect(response.body.per_page).toEqual(6);

    response.body.data.forEach((user: any) => {
      apiHelper.validateUserSchema(user);
    });

    apiHelper.validateSupportSchema(response.body.support);
  });

  test("[2, API] should get single user with comprehensive validation", async () => {
    const userId = 2;
    const response = await apiHelper.makeRequest("GET", `/api/users/${userId}`);

    expect(response.status).toBe(200);

    apiHelper.validateResponseTime(response.responseTime);

    expect(response.body).toHaveProperty("data");
    apiHelper.validateUserSchema(response.body.data);

    expect(response.body.data.id).toEqual(userId);
    expect(response.body.data.email).toEqual("janet.weaver@reqres.in");
    expect(response.body.data.first_name).toEqual("Janet");
    expect(response.body.data.last_name).toEqual("Weaver");

    apiHelper.validateSupportSchema(response.body.support);
  });

  test("[3, API] should handle user not found with proper error response", async () => {
    const response = await apiHelper.makeRequest("GET", "/api/users/999");

    expect(response.status).toBe(404);

    apiHelper.validateResponseTime(response.responseTime);
    expect(response.body).toEqual({});
  });

  test("[4, API] should get resources list with schema validation", async () => {
    const response = await apiHelper.makeRequest("GET", "/api/unknown");

    expect(response.status).toBe(200);

    apiHelper.validateResponseTime(response.responseTime);

    apiHelper.validatePaginationSchema(response.body);

    response.body.data.forEach((resource: any) => {
      apiHelper.validateResourceSchema(resource);
    });

    apiHelper.validateSupportSchema(response.body.support);
  });

  test("[5, API] should get single resource with detailed validation", async () => {
    const resourceId = 2;
    const response = await apiHelper.makeRequest("GET", `/api/unknown/${resourceId}`);

    expect(response.status).toBe(200);

    apiHelper.validateResponseTime(response.responseTime);

    expect(response.body).toHaveProperty("data");
    apiHelper.validateResourceSchema(response.body.data);

    expect(response.body.data.id).toEqual(resourceId);
    expect(response.body.data.name).toEqual("fuchsia rose");
    expect(response.body.data.year).toEqual(2001);
    expect(response.body.data.color).toEqual("#C74375");
    expect(response.body.data.pantone_value).toEqual("17-2031");

    apiHelper.validateSupportSchema(response.body.support);
  });

  test("[6, API] should handle resource not found", async () => {
    const response = await apiHelper.makeRequest("GET", "/api/unknown/999");

    expect(response.status).toBe(404);

    apiHelper.validateResponseTime(response.responseTime);
    expect(response.body).toEqual({});
  });

  test("[7, API] should handle delayed response with timeout", async () => {
    const response = await apiHelper.makeRequest("GET", "/api/unknown/2", {
      params: { delay: "3" },
    });

    expect(response.status).toBe(200);

    expect(response.responseTime).toBeGreaterThan(2900);
    expect(response.responseTime).toBeLessThan(10000);

    expect(response.body).toHaveProperty("data");
    apiHelper.validateResourceSchema(response.body.data);
    apiHelper.validateSupportSchema(response.body.support);
  });

  test("[8, API] should validate response headers and content type", async () => {
    const response = await apiHelper.makeRequest("GET", "/api/users/1");

    expect(response.status).toBe(200);

    apiHelper.validateCommonHeaders(response.headers);

    if (response.headers["cache-control"]) {
      expect(response.headers["cache-control"]).toBeTruthy();
    }
    if (response.headers["x-powered-by"]) {
      expect(response.headers["x-powered-by"]).toBeTruthy();
    }
  });

  test("[9, API] should handle pagination edge cases", async () => {
    const firstPageResponse = await apiHelper.makeRequest("GET", "/api/users", {
      params: { page: "1" },
    });

    expect(firstPageResponse.status).toBe(200);

    if (firstPageResponse.status === 200) {
      expect(firstPageResponse.body.page).toEqual(1);
    }

    const lastPageResponse = await apiHelper.makeRequest("GET", "/api/users", {
      params: { page: "2" },
    });

    expect(lastPageResponse.status).toBe(200);

    if (lastPageResponse.status === 200) {
      expect(lastPageResponse.body.page).toEqual(2);
    }

    const invalidPageResponse = await apiHelper.makeRequest("GET", "/api/users", {
      params: { page: "100" },
    });

    expect(invalidPageResponse.status).toBe(200);

    if (invalidPageResponse.status === 200) {
      expect(invalidPageResponse.body.data).toEqual([]);
    }
  });
});
