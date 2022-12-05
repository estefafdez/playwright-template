import { test, expect } from "@playwright/test";

test.describe("API PUT 200 Request", () => {
  test("[13, API] should get a 200 response after a PUT request to update the user data", async ({
    request,
    baseURL,
  }) => {
    const response = await request.put(`${baseURL}/api/users/2`, {
      data: {
        body: {
          name: "morpheus",
          job: "zion resident",
        },
      },
    });

    const responseBody = await response.json();

    expect(response.status()).toBe(200);
    console.log(responseBody);
    expect(responseBody.body.name).toEqual("morpheus");
    expect(responseBody.body.job).toEqual("zion resident");
    expect(responseBody).toHaveProperty("updatedAt");
  });
});
