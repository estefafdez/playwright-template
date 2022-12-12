import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

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

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
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
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ["html", { open: "on-failure" }],
    ["junit", xrayOptions],
    ["list", { printSteps: true }],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    actionTimeout: 0,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "api",
      testMatch: "api/**/*",
      use: {
        baseURL: "https://reqres.in",
        ...devices["Desktop Chrome"],
      },
    },
    {
      name: "web",
      testMatch: "web/**/*",
      use: {
        baseURL: "https://demo.seleniumeasy.com",
        ...devices["Desktop Chrome"],
      },
    },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: "test-results/",
};

export default config;
