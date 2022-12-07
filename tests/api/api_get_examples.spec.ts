import { test, expect } from "@playwright/test";
import { qase } from "playwright-qase-reporter/dist/playwright";

test.describe("API GET 200 Request", () => {
  test(
    qase(
      [1],
      "[1, API] should get a 200 response after a GET request for the complete list of users"
    ),
    async ({ request, baseURL }) => {
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
    }
  );

  test(
    qase(
      [2],
      "[2, API] should get a 200 response after a GET request for a single user"
    ),
    async ({ request, baseURL }) => {
      const response = await request.get(`${baseURL}/api/users/2`);
      const responseBody = await response.json();

      expect(response.status()).toBe(200);
      expect(responseBody).toHaveProperty("data");
      expect(responseBody.data.id).toEqual(2);
      expect(responseBody.data.email).toEqual("janet.weaver@reqres.in");
      expect(responseBody.data.first_name).toEqual("Janet");
      expect(responseBody.data.last_name).toEqual("Weaver");
      expect(responseBody.data.avatar).toEqual(
        "https://reqres.in/img/faces/2-image.jpg"
      );
      expect(responseBody).toHaveProperty("support");
      expect(responseBody.support.url).toEqual(
        "https://reqres.in/#support-heading"
      );
      expect(responseBody.support.text).toEqual(
        "To keep ReqRes free, contributions towards server costs are appreciated!"
      );
    }
  );

  test(
    qase(
      [3],
      "[3, API] should get a 404 response after a GET request for a single user not found"
    ),
    async ({ request, baseURL }) => {
      const response = await request.get(`${baseURL}/api/users/23`);
      const responseBody = await response.json();

      expect(response.status()).toBe(404);
    }
  );

  test(
    qase(
      [4],
      "[4, API] should get a 200 response after a GET request for a list of resources"
    ),
    async ({ request, baseURL }) => {
      const response = await request.get(`${baseURL}/api/unknown`);
      const responseBody = await response.json();

      expect(response.status()).toBe(200);
      expect(responseBody).toHaveProperty("data");
      expect(responseBody.page).toEqual(1);
      expect(responseBody.per_page).toEqual(6);
      expect(responseBody.total).toEqual(12);
      expect(responseBody.total_pages).toEqual(2);
      expect(responseBody).toHaveProperty("support");
      expect(responseBody.support.url).toEqual(
        "https://reqres.in/#support-heading"
      );
      expect(responseBody.support.text).toEqual(
        "To keep ReqRes free, contributions towards server costs are appreciated!"
      );
    }
  );

  test(
    qase(
      [5],
      "[5, API] should get a 200 response after a GET request for a single resource from a list"
    ),
    async ({ request, baseURL }) => {
      const response = await request.get(`${baseURL}/api/unknown/2`);
      const responseBody = await response.json();

      expect(response.status()).toBe(200);
      expect(responseBody).toHaveProperty("data");
      expect(responseBody.data.id).toEqual(2);
      expect(responseBody.data.name).toEqual("fuchsia rose");
      expect(responseBody.data.year).toEqual(2001);
      expect(responseBody.data.color).toEqual("#C74375");
      expect(responseBody.data.pantone_value).toEqual("17-2031");
      expect(responseBody).toHaveProperty("support");
      expect(responseBody.support.url).toEqual(
        "https://reqres.in/#support-heading"
      );
      expect(responseBody.support.text).toEqual(
        "To keep ReqRes free, contributions towards server costs are appreciated!"
      );
    }
  );

  test(
    qase(
      [6],
      "[6, API] should get a 404 response after a GET request for a single resource from a list not found"
    ),
    async ({ request, baseURL }) => {
      const response = await request.get(`${baseURL}/api/unknown/23`);
      const responseBody = await response.json();

      expect(response.status()).toBe(404);
    }
  );

  test(
    qase(
      [7],
      "[7, API] should get a delay response 200 response after a GET request for a single resource from a list"
    ),
    async ({ request, baseURL }) => {
      const response = await request.get(`${baseURL}/api/unknown/2?delay=3`);
      const responseBody = await response.json();

      expect(response.status()).toBe(200);
      expect(responseBody).toHaveProperty("data");
      expect(responseBody.data.id).toEqual(2);
      expect(responseBody.data.name).toEqual("fuchsia rose");
      expect(responseBody.data.year).toEqual(2001);
      expect(responseBody.data.color).toEqual("#C74375");
      expect(responseBody.data.pantone_value).toEqual("17-2031");
      expect(responseBody).toHaveProperty("support");
      expect(responseBody.support.url).toEqual(
        "https://reqres.in/#support-heading"
      );
      expect(responseBody.support.text).toEqual(
        "To keep ReqRes free, contributions towards server costs are appreciated!"
      );
    }
  );
});
