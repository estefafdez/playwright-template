import { defineConfig, devices } from "@playwright/test";
import type { PlaywrightTestConfig } from "@playwright/test";
import type {
  PlaywrightOpentelemetryConfig,
  PlaywrightOpentelemetryUseOptions,
} from "playwright-opentelemetry/fixture" with { "resolution-mode": "import" };
import "dotenv/config";

const playwrightOpentelemetry: PlaywrightOpentelemetryConfig = {
  storeTraceZip: true,
};

// JUnit reporter config for Xray
const xrayOptions = {
  // Whether to add <properties> with all annotations; default is false
  embedAnnotationsAsProperties: true,

  // By default, annotation is reported as <property name='' value=''>.
  // These annotations are reported as <property name=''>value</property>.
  textContentAnnotations: ["test_description"],

  // This will create a "testrun_evidence" property that contains all attachments. Each attachment is added as an inner <item> element.
  // Disables [[ATTACHMENT|path]] in the <system-out>.
  embedAttachmentsAsProperty: "testrun_evidence",

  // Where to put the report.
  outputFile: "playwright-report/xray-report.xml",
};

const testDinoToken = process.env.TESTDINO_TOKEN?.trim();

const createReporter = (): NonNullable<PlaywrightTestConfig["reporter"]> => {
  const baseReporter: NonNullable<PlaywrightTestConfig["reporter"]> = [
    ["playwright-opentelemetry/reporter"],
    ["html", { open: "on-failure" }],
    ["junit", xrayOptions],
    ["list", { printSteps: true }],
    ["json", { outputFile: "playwright-report/results.json" }],
  ];

  return testDinoToken
    ? [["@testdino/playwright", { token: testDinoToken }], ...baseReporter]
    : baseReporter;
};

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<PlaywrightOpentelemetryUseOptions>({
  testDir: "./tests",
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. Undefined means that pw will take care of it */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: createReporter(),
  /* Shared timeout for all tests. This is useful for long-running tests. */
  globalTimeout: 15 * 60 * 1000, // 15 minutes
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    actionTimeout: 10000,
    playwrightOpentelemetry,
    trace: "on",
    screenshot: "only-on-failure",
    headless: true, // Set to false if you want to see the browser during tests
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name: "api",
      testMatch: "api/**/*",
      testDir: "./tests/api",
      use: {
        baseURL: "https://reqres.in",
        ...devices["Desktop Chrome"],
      },
    },
    {
      name: "web",
      testMatch: "web/**/*",
      testDir: "./tests/web",
      use: {
        baseURL: "https://testing.qaautomationlabs.com",
        ...devices["Desktop Chrome"],
      },
    },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: "test-results/",
});
