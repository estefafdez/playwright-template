import { expect, test } from "@playwright/test";
import { ApiHelpers, TEST_DATA } from "../../helpers/api-helpers";
import addApiDelay from "../../helpers/api-setup";

const fs = require("fs");
const userDataPath = `${__dirname}/../../data/users`;

test.describe("API POST Requests - Create, Register & Login", () => {
  let apiHelper: ApiHelpers;
  let userData: any;

  test.beforeAll(async () => {
    const user1Data = fs.readFileSync(`${userDataPath}/user1.json`, "utf8");
    userData = JSON.parse(user1Data);
  });

  test.beforeEach(async ({ request, baseURL }) => {
    apiHelper = new ApiHelpers(request, baseURL || "https://reqres.in");
  });

  test.afterEach(async () => {
    await addApiDelay();
  });

  test("[10, API] should create new user with comprehensive validation", async () => {
    const createUserData = {
      name: userData.name,
      job: userData.job,
    };

    const response = await apiHelper.makeRequest("POST", "/api/users", {
      data: createUserData,
    });

    expect(response.status).toBe(201);
    apiHelper.validateResponseTime(response.responseTime);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body.name).toEqual(createUserData.name);
    expect(response.body.job).toEqual(createUserData.job);

    expect(response.body.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);

    expect(typeof response.body.id).toBe("string");
    expect(response.body.id.length).toBeGreaterThan(0);
  });

  test("[11, API] should create user with minimal data", async () => {
    const minimalData = { name: "test user" };

    const response = await apiHelper.makeRequest("POST", "/api/users", {
      data: minimalData,
    });

    expect(response.status).toBe(201);
    expect(response.body.name).toEqual(minimalData.name);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("createdAt");
  });

  test("[12, API] should create user with special characters in data", async () => {
    const specialData = {
      name: "José María O'Connor",
      job: "Senior QA Engineer & Test Automation Specialist",
    };

    const response = await apiHelper.makeRequest("POST", "/api/users", {
      data: specialData,
    });

    expect(response.status).toBe(201);
    expect(response.body.name).toEqual(specialData.name);
    expect(response.body.job).toEqual(specialData.job);
  });

  test("[13, API] should register user successfully", async () => {
    const response = await apiHelper.makeRequest("POST", "/api/register", {
      data: TEST_DATA.users.validRegistration,
    });

    expect(response.status).toBe(200);
    apiHelper.validateResponseTime(response.responseTime);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("token");
    expect(typeof response.body.id).toBe("number");
    expect(typeof response.body.token).toBe("string");
    expect(response.body.token.length).toBeGreaterThan(10);
  });

  test("[14, API] should fail registration without password", async () => {
    const response = await apiHelper.makeRequest("POST", "/api/register", {
      data: TEST_DATA.users.invalidRegistration,
    });

    expect(response.status).toBe(400);
    apiHelper.validateResponseTime(response.responseTime);

    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Missing password");
  });

  test("[15, API] should login user successfully", async () => {
    const response = await apiHelper.makeRequest("POST", "/api/login", {
      data: TEST_DATA.users.validLogin,
    });

    expect(response.status).toBe(200);
    apiHelper.validateResponseTime(response.responseTime);

    expect(response.body).toHaveProperty("token");
    expect(response.body.token).toEqual("QpwL5tke4Pnpja7X4");
  });

  test("[16, API] should fail login without password", async () => {
    const response = await apiHelper.makeRequest("POST", "/api/login", {
      data: TEST_DATA.users.invalidLogin,
    });

    expect(response.status).toBe(400);
    apiHelper.validateResponseTime(response.responseTime);

    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Missing password");
  });

  test("[17, API] should handle empty payload gracefully", async () => {
    const response = await apiHelper.makeRequest("POST", "/api/users", {
      data: {},
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("createdAt");
  });

  test("[18, API] should validate request headers for POST operations", async () => {
    const response = await apiHelper.makeRequest("POST", "/api/users", {
      data: TEST_DATA.users.validUser,
      headers: {
        "User-Agent": "Playwright-Test-Suite",
        Accept: "application/json",
      },
    });

    expect(response.status).toBe(201);
    apiHelper.validateCommonHeaders(response.headers);
  });
});
