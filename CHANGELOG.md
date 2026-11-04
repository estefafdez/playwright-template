## [v1.6.0] - 2026-11-03

### Added

- add local Reqres-compatible API to run API tests without rate limits by @estefafdez in [#53](https://github.com/estefafdez/playwright-template/pull/53)
- register Beacon reporter in Playwright config by @estefafdez in [#50](https://github.com/estefafdez/playwright-template/pull/50)
- add beacon-reporter dependency by @estefafdez in [#50](https://github.com/estefafdez/playwright-template/pull/50)
- Add repository PR template with Done Definition checks by @Copilot in [#24](https://github.com/estefafdez/playwright-template/pull/24)

### Fixed

- keep Playwright reporter config mutable by @Copilot in [#23](https://github.com/estefafdez/playwright-template/pull/23)
- guard optional TestDino reporter token by @Copilot in [#23](https://github.com/estefafdez/playwright-template/pull/23)
- wire TestDino into Playwright run by @Copilot in [#23](https://github.com/estefafdez/playwright-template/pull/23)

### Docs

- link published Beacon report and refresh README by @estefafdez in [#51](https://github.com/estefafdez/playwright-template/pull/51)
- add contributing guide, security policy and code owners by @estefafdez in [#27](https://github.com/estefafdez/playwright-template/pull/27)

### Test

- re-enable malformed JSON error handling test by @estefafdez in [#54](https://github.com/estefafdez/playwright-template/pull/54)
- add accessibility scan with axe-core by @estefafdez in [#25](https://github.com/estefafdez/playwright-template/pull/25)

### Chore

- bump @testdino/playwright from 2.10.2 to 2.11.1 by @dependabot[bot] in [#59](https://github.com/estefafdez/playwright-template/pull/59)
- bump actions/download-artifact from 7 to 8 by @dependabot[bot] in [#56](https://github.com/estefafdez/playwright-template/pull/56)
- bump @types/node from 26.6.5 to 26.6.6 by @dependabot[bot] in [#55](https://github.com/estefafdez/playwright-template/pull/55)
- bump playwright-opentelemetry from 0.13.5 to 0.13.6 by @dependabot[bot] in [#58](https://github.com/estefafdez/playwright-template/pull/58)
- bump playwright-qase-reporter from 2.7.0 to 2.8.0 by @dependabot[bot] in [#57](https://github.com/estefafdez/playwright-template/pull/57)
- scope Pages deployment to its own job by @estefafdez in [#52](https://github.com/estefafdez/playwright-template/pull/52)
- bump dotenv from 18.0.8 to 18.0.9 by @dependabot[bot] in [#49](https://github.com/estefafdez/playwright-template/pull/49)
- bump @playwright/test from 1.64.0 to 1.64.1 by @dependabot[bot] in [#48](https://github.com/estefafdez/playwright-template/pull/48)
- bump @testdino/playwright from 2.10.1 to 2.10.2 by @dependabot[bot] in [#47](https://github.com/estefafdez/playwright-template/pull/47)
- bump playwright-opentelemetry from 0.13.4 to 0.13.5 by @dependabot[bot] in [#46](https://github.com/estefafdez/playwright-template/pull/46)
- bump @testdino/playwright from 2.9.0 to 2.10.1 by @dependabot[bot] in [#44](https://github.com/estefafdez/playwright-template/pull/44)
- bump dotenv from 18.0.7 to 18.0.8 by @dependabot[bot] in [#43](https://github.com/estefafdez/playwright-template/pull/43)
- bump playwright from 1.64.0 to 1.64.1 by @dependabot[bot] in [#42](https://github.com/estefafdez/playwright-template/pull/42)
- bump @axe-core/playwright from 4.13.0 to 4.14.0 by @dependabot[bot] in [#45](https://github.com/estefafdez/playwright-template/pull/45)
- bump dotenv from 17.4.2 to 18.0.7 by @dependabot[bot] in [#41](https://github.com/estefafdez/playwright-template/pull/41)
- bump @playwright/test from 1.62.1 to 1.64.0 by @dependabot[bot] in [#39](https://github.com/estefafdez/playwright-template/pull/39)
- bump @types/node from 26.1.2 to 26.6.5 by @dependabot[bot] in [#40](https://github.com/estefafdez/playwright-template/pull/40)
- bump playwright from 1.63.0 to 1.64.0 by @dependabot[bot] in [#38](https://github.com/estefafdez/playwright-template/pull/38)
- bump @testdino/playwright from 2.7.6 to 2.9.0 by @dependabot[bot] in [#37](https://github.com/estefafdez/playwright-template/pull/37)
- bump actions/checkout from 4 to 7 by @dependabot[bot] in [#30](https://github.com/estefafdez/playwright-template/pull/30)
- bump actions/upload-artifact from 4 to 7 by @dependabot[bot] in [#29](https://github.com/estefafdez/playwright-template/pull/29)
- bump @testdino/playwright from 2.2.0 to 2.7.6 by @dependabot[bot] in [#33](https://github.com/estefafdez/playwright-template/pull/33)
- bump playwright from 1.62.1 to 1.63.0 by @dependabot[bot] in [#34](https://github.com/estefafdez/playwright-template/pull/34)
- bump actions/setup-node from 4 to 7 by @dependabot[bot] in [#31](https://github.com/estefafdez/playwright-template/pull/31)
- bump playwright-opentelemetry from 0.12.1 to 0.13.4 by @dependabot[bot] in [#32](https://github.com/estefafdez/playwright-template/pull/32)
- bump actions/cache from 4 to 6 by @dependabot[bot] in [#36](https://github.com/estefafdez/playwright-template/pull/36)
- bump playwright-qase-reporter from 2.5.7 to 2.7.0 by @dependabot[bot] in [#35](https://github.com/estefafdez/playwright-template/pull/35)
- add Dependabot configuration by @estefafdez in [#26](https://github.com/estefafdez/playwright-template/pull/26)
- add an editorconfig by @estefafdez in [#28](https://github.com/estefafdez/playwright-template/pull/28)
- update dependencies to latest versions
- Integrate playwright-opentelemetry for test tracing by @estefafdez in [#20](https://github.com/estefafdez/playwright-template/pull/20)

[v1.6.0]: https://github.com/estefafdez/playwright-template/compare/1.5...HEAD
**Full Changelog**: https://github.com/estefafdez/playwright-template/compare/1.5...HEAD

