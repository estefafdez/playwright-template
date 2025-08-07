import { test } from "@playwright/test";

// Global afterEach hook for all API tests to avoid 429 rate limiting
// This setup will be automatically imported by all API test files
test.afterEach(async () => {
  // Add delay to avoid 429 rate limiting
  await new Promise((resolve) => setTimeout(resolve, 1000));
});

export {};
