import { test, expect } from "@playwright/test";

const fs = require("fs");
const userDataPath = `${__dirname}/../../data/users`;

let user1Data = fs.readFileSync(`${userDataPath}/user1.json`, "utf8");
let user2Data = fs.readFileSync(`${userDataPath}/user2.json`, "utf8");
let user3Data = fs.readFileSync(`${userDataPath}/user3.json`, "utf8");
let user4Data = fs.readFileSync(`${userDataPath}/user4.json`, "utf8");

const user1 = JSON.parse(user1Data);
const user2 = JSON.parse(user2Data);
const user3 = JSON.parse(user3Data);
const user4 = JSON.parse(user4Data);

test.describe("API POST 200 Request", () => {
  test("[8, API] should get a 201 response after a POST request to create a new user", async ({
    request,
    baseURL,
  }) => {
    const response = await request.post(`${baseURL}/api/users`, {
      data: {
        body: {
          name: user1.name,
          job: user1.job,
        },
      },
    });

    const responseBody = await response.json();

    expect(response.status()).toBe(201);
    expect(responseBody.body.name).toEqual("Estefania");
    expect(responseBody.body.job).toEqual("QA Automation Engineer");
    expect(responseBody).toHaveProperty("id");
    expect(responseBody).toHaveProperty("createdAt");
  });

  test("[9, API] should get a 200 response after a POST request to register a new user successfully", async ({
    request,
    baseURL,
  }) => {
    const response = await request.post(`${baseURL}/api/register`, {
      data: {
        body: {
          email: user1.email,
          password: user1.password,
        },
      },
    });

    const responseBody = await response.json();
    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty("id");
    expect(responseBody).toHaveProperty("token");
  });

  test("[10, API] should get a 400 response after a POST request to register a new user without a password set unsuccessfully", async ({
    request,
    baseURL,
  }) => {
    const response = await request.post(`${baseURL}/api/register`, {
      data: {
        body: {
          email: user3.email,
        },
      },
    });

    const responseBody = await response.json();
    expect(response.status()).toBe(400);
    expect(responseBody.error).toEqual("Missing password");
  });

  test("[11, API] should get a 200 response after a POST request to login with a user successfully", async ({
    request,
    baseURL,
  }) => {
    const response = await request.post(`${baseURL}/api/login`, {
      data: {
        body: {
          email: user2.email,
          password: user2.password,
        },
      },
    });

    const responseBody = await response.json();
    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty("id");
    expect(responseBody.token).toEqual("QpwL5tke4Pnpja7X4");
  });

  test("[12, API] should get a 400 response after a POST request to login with a user without a password set unsuccessfully", async ({
    request,
    baseURL,
  }) => {
    const response = await request.post(`${baseURL}/api/login`, {
      data: {
        body: {
          email: user4.email,
        },
      },
    });

    const responseBody = await response.json();
    expect(response.status()).toBe(400);
    expect(responseBody.error).toEqual("Missing password");
  });
});
