import { APIRequestContext, expect } from "@playwright/test";
import { ApiRequestOptions } from "../types/apiRequestOptions";

export interface ApiResponse {
  status: number;
  body: any;
  headers: Record<string, string>;
  responseTime: number;
}

export class ApiHelpers {
  private request: APIRequestContext;
  private baseURL: string;

  constructor(request: APIRequestContext, baseURL: string) {
    this.request = request;
    this.baseURL = baseURL;
  }

  async makeRequest(method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE", endpoint: string, options?: ApiRequestOptions): Promise<ApiResponse> {
    const startTime = Date.now();

    const defaultHeaders = {
      "x-api-key": "reqres-free-v1",
      "Content-Type": "application/json",
      ...options?.headers,
    };

    let url = `${this.baseURL}${endpoint}`;
    if (options?.params) {
      const searchParams = new URLSearchParams(options.params);
      url += `?${searchParams.toString()}`;
    }

    const requestOptions = {
      headers: defaultHeaders,
      ...(options?.data && { data: options.data }),
      ...(options?.timeout && { timeout: options.timeout }),
    };

    let response;
    switch (method) {
      case "GET":
        response = await this.request.get(url, requestOptions);
        break;
      case "POST":
        response = await this.request.post(url, requestOptions);
        break;
      case "PUT":
        response = await this.request.put(url, requestOptions);
        break;
      case "PATCH":
        response = await this.request.patch(url, requestOptions);
        break;
      case "DELETE":
        response = await this.request.delete(url, requestOptions);
        break;
    }

    const endTime = Date.now();
    const responseTime = endTime - startTime;

    let body;
    try {
      body = await response.json();
    } catch {
      body = await response.text();
    }

    return {
      status: response.status(),
      body,
      headers: response.headers(),
      responseTime,
    };
  }

  validateResponseTime(responseTime: number, maxTime: number = 5000) {
    expect(responseTime).toBeLessThan(maxTime);
  }

  validateCommonHeaders(headers: Record<string, string>) {
    expect(headers["content-type"]).toContain("application/json");
    expect(headers["server"]).toBeTruthy();
  }

  validateUserSchema(user: any) {
    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("email");
    expect(user).toHaveProperty("first_name");
    expect(user).toHaveProperty("last_name");
    expect(user).toHaveProperty("avatar");
    expect(typeof user.id).toBe("number");
    expect(typeof user.email).toBe("string");
    expect(user.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  }

  validateResourceSchema(resource: any) {
    expect(resource).toHaveProperty("id");
    expect(resource).toHaveProperty("name");
    expect(resource).toHaveProperty("year");
    expect(resource).toHaveProperty("color");
    expect(resource).toHaveProperty("pantone_value");
    expect(typeof resource.id).toBe("number");
    expect(typeof resource.name).toBe("string");
    expect(typeof resource.year).toBe("number");
  }

  validatePaginationSchema(response: any) {
    expect(response).toHaveProperty("page");
    expect(response).toHaveProperty("per_page");
    expect(response).toHaveProperty("total");
    expect(response).toHaveProperty("total_pages");
    expect(response).toHaveProperty("data");
    expect(Array.isArray(response.data)).toBeTruthy();
  }

  validateSupportSchema(support: any) {
    expect(support).toHaveProperty("url");
    expect(support).toHaveProperty("text");
    expect(support.url).toContain("https://");
    expect(typeof support.text).toBe("string");
  }
}

export const TEST_DATA = {
  users: {
    validUser: { name: "morpheus", job: "leader" },
    validRegistration: { email: "eve.holt@reqres.in", password: "pistol" },
    invalidRegistration: { email: "sydney@fife" },
    validLogin: { email: "eve.holt@reqres.in", password: "cityslicka" },
    invalidLogin: { email: "peter@klaven" },
  },
  resources: {
    validResource: { name: "cerulean", year: 2000, color: "#98B2D1", pantone_value: "15-4020" },
  },
};

// Helper function to add delay between API tests to avoid rate limiting
export const addApiDelay = async (delayMs: number = 1000) => {
  await new Promise((resolve) => setTimeout(resolve, delayMs));
};
