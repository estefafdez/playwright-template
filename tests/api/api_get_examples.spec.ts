import { test, expect, request } from "@playwright/test";

test.describe("API GET 200 Request", () => {
  test("should get a 200 response after a GET request for the complete list of users", async ({
    request,
    baseURL,
  }) => {
    const response = await request.get(`${baseURL}/api/users?page=2`);
    const responseBody = await response.json();

    expect(response.status()).toBe(200);
    expect(responseBody.page).toEqual(2);
    expect(responseBody.per_page).toEqual(6);
    expect(responseBody.total).toEqual(12);
    expect(responseBody.total_pages).toEqual(2);
    expect(responseBody).toHaveProperty("data");
    expect(responseBody).toHaveProperty("support");
    expect(responseBody.support.url).toEqual(
      "https://reqres.in/#support-heading"
    );
    expect(responseBody.support.text).toEqual(
      "To keep ReqRes free, contributions towards server costs are appreciated!"
    );
  });
});
