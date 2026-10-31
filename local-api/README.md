# Local API (Reqres-compatible)

Zero-dependency Node server that replicates the endpoints and response shapes of
[reqres.in](https://reqres.in) used by the API tests in this template. It lets the
API suite run locally with no external rate limits and no API key.

## Usage

```bash
# Terminal 1: start the mock API (http://localhost:3000)
npm run api:local

# Terminal 2: run the API tests against it
npm run test:api:local
```

The Playwright config starts the server automatically when `API_BASE_URL` points
to localhost, so a single command also works:

```bash
API_BASE_URL=http://localhost:3000 npx playwright test --project=api
```

`PORT=4000 npm run api:local` changes the listening port.

## Endpoints

Same contract as Reqres:

| Method | Path | Behavior |
| --- | --- | --- |
| GET | `/api/users?page={n}` | Paginated list (6 per page, 12 seeded users) with `support` block |
| GET | `/api/users/{id}` | Single user, `404 {}` when unknown |
| POST | `/api/users` | `201` echo plus string `id` and `createdAt`; the user is stored in memory |
| PUT/PATCH | `/api/users/{id}` | `200` echo plus `updatedAt` |
| DELETE | `/api/users/{id}` | `204`, also for unknown ids (Reqres behavior) |
| GET | `/api/unknown` | Paginated resource list (`name`, `year`, `color`, `pantone_value`) |
| GET | `/api/unknown/{id}` | Single resource, `404 {}` when unknown |
| POST | `/api/register` | `200 {id, token}` for defined users, `400 {error}` otherwise or without password |
| POST | `/api/login` | `200 {token}` for defined users, `400 {error}` otherwise or without password |

Register and login succeed for the seeded Reqres credential
(`eve.holt@reqres.in`) and return the same token as Reqres
(`QpwL5tke4Pnpja7X4`).

## Scope and differences

- Like Reqres, writes are stateless: created users get incremental ids but the
  seeded dataset (users 1-12, resources 1-6) never changes between requests.
- No authentication or rate limiting: the `x-api-key` header is accepted and
  ignored.
- Query params `page` and `per_page` are honored; `delay` is not implemented.
