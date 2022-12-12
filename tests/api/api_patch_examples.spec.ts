import { test, expect } from "@playwright/test";

test.describe("API PATCH 200 Request", () => {
  test("[14, API] should get a 200 response after a PATCH request to update the user data", async ({
    request,
    baseURL,
  }) => {
    const response = await request.patch(`${baseURL}/api/users/2`, {
      data: {
        body: {
          name: "morpheus",
          job: "zion resident",
        },
      },
    });

    const responseBody = await response.json();

    expect(response.status()).toBe(200);
    expect(responseBody.body.name).toEqual("morpheus");
    expect(responseBody.body.job).toEqual("zion resident");
    expect(responseBody).toHaveProperty("updatedAt");
  });
});
