import { expect, test } from "@playwright/test";
import { ApiHelpers } from "../../helpers/api-helpers";
import addApiDelay from "../../helpers/api-setup";

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
});
