import AxeBuilder from "@axe-core/playwright";
import { expect } from "@playwright/test";
import { test } from "playwright-opentelemetry/fixture";
import { HomePage } from "../../pages/HomePage";

test.describe("Accessibility Tests", () => {
  test("home page should have no critical accessibility violations", async ({ page }, testInfo) => {
    const homePage = new HomePage(page);
    await homePage.navigate();

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      // Known issue of the site under test (a <ul role="menu"> with plain <li> children). Remove this line to see it.
      .disableRules(["aria-required-children"])
      .analyze();

    // Attach the full report so every violation can be reviewed, even the ones that do not fail the test
    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(results.violations, null, 2),
      contentType: "application/json",
    });

    const critical = results.violations.filter((violation) => violation.impact === "critical");
    expect(critical).toEqual([]);
  });
});
