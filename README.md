# playwright-template

[![E2E tests](https://github.com/estefafdez/playwright-template/actions/workflows/playwright.yml/badge.svg)](https://github.com/estefafdez/playwright-template/actions/workflows/playwright.yml)

A reference template for learning **Playwright** with **TypeScript**. Includes web and API tests, Page Object Model, test data management, Qase integration and CI-ready configuration.

---

## Requirements

- Node.js 24+
- npm 9+

## Installation

```bash
npm install
npx playwright install
```

Create a `.env` file in the root with the required variables:

```env
REQRES_API_KEY=your_api_key
```

---

## Commands

| Command | Description |
|---|---|
| `npm test` | Run all tests |
| `npm run test:web` | Web tests only |
| `npm run test:api` | API tests only |
| `npm run ui` | Open the Playwright interactive UI mode |
| `npm run debug` | Run in debug mode (step by step) |
| `npm run report` | Open the last HTML report |

---

## Project structure

```
playwright-template/
├── data/                  # Reusable test data
│   ├── testData.ts        # Data for web tests (forms, etc.)
│   └── users/             # User data for API tests (JSON)
├── elements/              # Locators organised by page area
│   ├── FormElements.ts
│   ├── HomeElements.ts
│   └── NavigationElements.ts
├── helpers/               # Shared utilities
│   ├── api-helpers.ts     # HTTP client and schema validators
│   └── api-setup.ts       # Delay helper to avoid rate limiting
├── pages/                 # Page Objects (actions per page)
│   ├── ContactPage.ts
│   ├── HomePage.ts
│   └── NavigationPage.ts
├── tests/
│   ├── api/               # REST API tests (GET, POST, PUT, PATCH, DELETE)
│   └── web/               # Web UI tests
├── types/                 # Shared TypeScript types
├── playwright.config.ts   # Playwright configuration
└── .env                   # Environment variables (do not commit)
```

---

## Configured projects

| Project | Base URL | Tests |
|---|---|---|
| `web` | https://testing.qaautomationlabs.com | `tests/web/` |
| `api` | https://reqres.in | `tests/api/` |

---

## Patterns demonstrated

- **Page Object Model (POM):** pages encapsulate actions, elements encapsulate locators
- **Separated test data:** `data/` keeps inputs out of test files
- **API helpers:** reusable HTTP client with schema and response-time validation
- **Environment-based config:** `baseURL` is defined in `playwright.config.ts`, not in code
- **Qase integration:** tests carry their ID in brackets `[N, Suite]`
- **CI with GitHub Actions:** configured to run on every push

---

## Test plans in Qase

- [All Tests](https://app.qase.io/project/CYEX)
