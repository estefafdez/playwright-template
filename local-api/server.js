/**
 * Local mock of the Reqres API (https://reqres.in).
 *
 * Zero-dependency Node server that replicates the endpoints and response
 * shapes used by the API tests in this template, so the suite can run
 * locally without external rate limits.
 *
 * Usage:
 *   node local-api/server.js           # listens on http://localhost:3000
 *   PORT=4000 node local-api/server.js # custom port
 */

import http from "node:http";

const PORT = Number(process.env.PORT || 3000);

const SUPPORT = {
  url: "https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral",
  text: "Tired of writing endless social media content? Let Content Caddy generate it for you.",
};

const firstNames = [
  ["George", "Bluth", "george.bluth"],
  ["Janet", "Weaver", "janet.weaver"],
  ["Emma", "Wong", "emma.wong"],
  ["Eve", "Holt", "eve.holt"],
  ["Charles", "Morris", "charles.morris"],
  ["Tracey", "Ramos", "tracey.ramos"],
  ["Michael", "Lawson", "michael.lawson"],
  ["Lindsay", "Ferguson", "lindsay.ferguson"],
  ["Tobias", "Funke", "tobias.funke"],
  ["Byron", "Fields", "byron.fields"],
  ["George", "Edwards", "george.edwards"],
  ["Rachel", "Howell", "rachel.howell"],
];

const buildUser = (index) => {
  const [first_name, last_name, emailPrefix] = firstNames[index - 1];
  return {
    id: index,
    email: `${emailPrefix}@reqres.in`,
    first_name,
    last_name,
    avatar: `https://reqres.in/img/faces/${index}-image.jpg`,
  };
};

// In-memory state: the 12 seeded users plus everything created at runtime.
const users = new Map(firstNames.map((_, i) => [i + 1, buildUser(i + 1)]));
let nextId = users.size + 1;

const RESOURCES = [
  { id: 1, name: "cerulean", year: 2000, color: "#98B2D1", pantone_value: "15-4020" },
  { id: 2, name: "fuchsia rose", year: 2001, color: "#C74375", pantone_value: "17-2031" },
  { id: 3, name: "true red", year: 2002, color: "#BF1932", pantone_value: "19-1664" },
  { id: 4, name: "aqua sky", year: 2003, color: "#7BC4C4", pantone_value: "14-4811" },
  { id: 5, name: "tigerlily", year: 2004, color: "#E2583E", pantone_value: "17-1456" },
  { id: 6, name: "blue turquoise", year: 2005, color: "#53B0AE", pantone_value: "15-5217" },
];

const TOKEN = "QpwL5tke4Pnpja7X4";
const REGISTERED_EMAILS = new Set(["eve.holt@reqres.in"]);

const isoNow = () => new Date().toISOString();

const sendJson = (res, status, body) => {
  const payload = body === undefined ? "" : JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    Server: "local-reqres-mock",
    "Access-Control-Allow-Origin": "*",
  });
  res.end(payload);
};

const readBody = (req) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => {
      if (chunks.length === 0) return resolve({});
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")));
      } catch (err) {
        reject(err);
      }
    });
    req.on("error", reject);
  });

const paginate = (items, page, perPage) => {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const start = (page - 1) * perPage;
  return {
    page,
    per_page: perPage,
    total,
    total_pages: totalPages,
    data: items.slice(start, start + perPage),
    support: SUPPORT,
  };
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const path = url.pathname.replace(/\/+$/, "") || "/";
  const method = req.method || "GET";

  const usersListMatch = path.match(/^\/api\/users$/);
  const userMatch = path.match(/^\/api\/users\/(\d+)$/);
  const unknownListMatch = path.match(/^\/api\/unknown$/);
  const unknownMatch = path.match(/^\/api\/unknown\/(\d+)$/);

  try {
    // GET /api/users
    if (method === "GET" && usersListMatch) {
      const page = Math.max(1, Number(url.searchParams.get("page") || 1));
      const perPage = Math.max(1, Number(url.searchParams.get("per_page") || 6));
      return sendJson(res, 200, paginate([...users.values()], page, perPage));
    }

    // GET /api/users/:id
    if (method === "GET" && userMatch) {
      const id = Number(userMatch[1]);
      const user = users.get(id);
      if (!user) return sendJson(res, 404, {});
      return sendJson(res, 200, { data: user, support: SUPPORT });
    }

    // POST /api/users
    if (method === "POST" && usersListMatch) {
      const body = await readBody(req);
      const id = nextId++;
      return sendJson(res, 201, { ...body, id: String(id), createdAt: isoNow() });
    }

    // PUT/PATCH /api/users/:id
    if ((method === "PUT" || method === "PATCH") && userMatch) {
      const id = Number(userMatch[1]);
      const body = await readBody(req);
      return sendJson(res, 200, { ...body, updatedAt: isoNow() });
    }

    // DELETE /api/users/:id (Reqres is stateless: always 204, even for unknown ids)
    if (method === "DELETE" && userMatch) {
      return sendJson(res, 204, undefined);
    }

    // GET /api/unknown
    if (method === "GET" && unknownListMatch) {
      const page = Math.max(1, Number(url.searchParams.get("page") || 1));
      const perPage = Math.max(1, Number(url.searchParams.get("per_page") || 6));
      return sendJson(res, 200, paginate(RESOURCES, page, perPage));
    }

    // GET /api/unknown/:id
    if (method === "GET" && unknownMatch) {
      const resource = RESOURCES.find((r) => r.id === Number(unknownMatch[1]));
      if (!resource) return sendJson(res, 404, {});
      return sendJson(res, 200, { data: resource, support: SUPPORT });
    }

    // POST /api/register
    if (method === "POST" && path === "/api/register") {
      const body = await readBody(req);
      if (!body.password) return sendJson(res, 400, { error: "Missing password" });
      if (!body.email || !REGISTERED_EMAILS.has(body.email)) {
        return sendJson(res, 400, { error: "Note: Only defined users succeed registration" });
      }
      const user = [...users.values()].find((u) => u.email === body.email);
      return sendJson(res, 200, { id: user ? user.id : 4, token: TOKEN });
    }

    // POST /api/login
    if (method === "POST" && path === "/api/login") {
      const body = await readBody(req);
      if (!body.password) return sendJson(res, 400, { error: "Missing password" });
      if (!body.email || !REGISTERED_EMAILS.has(body.email)) {
        return sendJson(res, 400, { error: "user not found" });
      }
      return sendJson(res, 200, { token: TOKEN });
    }

    return sendJson(res, 404, {});
  } catch (err) {
    return sendJson(res, 400, { error: "Bad request" });
  }
});

server.listen(PORT, () => {
  console.log(`Local Reqres-compatible API listening on http://localhost:${PORT}`);
});
