import { expect } from "@playwright/test";
import { test } from "playwright-opentelemetry/fixture";
import { ApiHelpers, TEST_DATA } from "../../helpers/api-helpers";
import addApiDelay from "../../helpers/api-setup";
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const userDataPath = join(__dirname, "../../data/users");

test.describe("API POST Requests - Create, Register & Login", () => {
  let apiHelper: ApiHelpers;
  let userData: any;

  test.beforeAll(async () => {
    const user1Data = readFileSync(join(userDataPath, "user1.json"), "utf8");
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
});
