# playwright-template

[![E2E tests](https://github.com/estefafdez/playwright-template/actions/workflows/playwright.yml/badge.svg)](https://github.com/estefafdez/playwright-template/actions/workflows/playwright.yml)

Template de referencia para aprender **Playwright** con **TypeScript**. Incluye tests web y API, Page Object Model, datos de test, integración con Qase y configuración lista para CI.

---

## Requisitos

- Node.js 18+
- npm 9+

## Instalación

```bash
npm install
npx playwright install
```

Crea un fichero `.env` en la raíz con las variables necesarias:

```env
REQRES_API_KEY=tu_api_key
```

---

## Comandos

| Comando | Descripción |
|---|---|
| `npm test` | Ejecuta todos los tests |
| `npm run test:web` | Solo tests web |
| `npm run test:api` | Solo tests de API |
| `npm run ui` | Abre el modo UI interactivo de Playwright |
| `npm run debug` | Ejecuta en modo debug (paso a paso) |
| `npm run report` | Abre el último informe HTML |

---

## Estructura del proyecto

```
playwright-template/
├── data/                  # Datos de test reutilizables
│   ├── testData.ts        # Datos para tests web (formularios, etc.)
│   └── users/             # Datos de usuario para tests de API (JSON)
├── elements/              # Locators organizados por área de la página
│   ├── FormElements.ts
│   ├── HomeElements.ts
│   └── NavigationElements.ts
├── helpers/               # Utilidades compartidas
│   ├── api-helpers.ts     # Cliente HTTP y validadores de schema
│   └── api-setup.ts       # Delay entre requests para evitar rate limiting
├── pages/                 # Page Objects (acciones por página)
│   ├── ContactPage.ts
│   ├── HomePage.ts
│   └── NavigationPage.ts
├── tests/
│   ├── api/               # Tests de API REST (GET, POST, PUT, PATCH, DELETE)
│   └── web/               # Tests de interfaz web
├── types/                 # Tipos TypeScript compartidos
├── playwright.config.ts   # Configuración de Playwright
└── .env                   # Variables de entorno (no commitear)
```

---

## Proyectos configurados

| Proyecto | URL base | Tests |
|---|---|---|
| `web` | https://testing.qaautomationlabs.com | `tests/web/` |
| `api` | https://reqres.in | `tests/api/` |

---

## Patrones que se demuestran

- **Page Object Model (POM):** las páginas encapsulan acciones y los elementos encapsulan locators
- **Datos de test separados:** `data/` mantiene los datos fuera de los tests
- **Helpers de API:** cliente reutilizable con validación de schema y tiempo de respuesta
- **Configuración por entorno:** `baseURL` se define en `playwright.config.ts`, no en el código
- **Integración con Qase:** los tests llevan el ID entre corchetes `[N, Suite]`
- **CI con GitHub Actions:** configurado para ejecutar en cada push

---

## Planes de test en Qase

- [API Tests](https://app.qase.io/project/CYEX)
- [Web Tests](https://app.qase.io/project/CYEX)
