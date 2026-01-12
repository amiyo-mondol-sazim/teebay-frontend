# Lune Pulse

Lune Pulse is a modern, modular Nuxt 3 application for managing and launching cashback offers, featuring a robust UI built with Tailwind CSS and Shadcn Vue components.

## Features & Architecture

- **Nuxt 3**: SSR, static site generation, modular structure, auto-imports
- **TypeScript**: Strict typing, interfaces, and composables
- **Tailwind CSS**: Custom color palette, utility-first, responsive design
- **Shadcn Vue UI**: Accessible, themeable, and composable UI components (prefixed with `Ui`)
- **VueUse**: Advanced reactivity and performance
- **Pinia**: State management with persisted state
- **Vue Router**: Modern routing
- **Google Fonts**: Figtree & Plus Jakarta Sans
- **OpenAPI**: Auto-generated API docs (Swagger & Scalar UI)
- **Prettier & ESLint**: Enforced code style
- **Vitest**: Unit and integration testing
- **Mock Data**: For local development and testing
- **Azure Deployment**: CI/CD workflow for Azure Static Web Apps

## Main Business Flows

- **Authentication**: Secure login with token-based auth
- **Offer Management**: Create, review, and manage cashback offers (fixed, percentage, tiered)
- **User Segments**: Target offers to dynamic user segments
- **Dashboard & Insights**: View offer stats, user acquisition, and revenue
- **Bank Integration**: Associate offers with banks

## Project Structure

- `features/` - Modular business logic, components, containers, composables, typedefs
- `assets/css/` - Tailwind and custom CSS
- `pages/` - Nuxt pages (routing)
- `server/` - API routes (REST, OpenAPI docs)
- `public/` - Static files (images, icons, etc.)
- `mock/` - Local mock data for dev/testing
- `tests/` - Vitest tests, mocks, and data generators

## API Endpoints

All endpoints are documented and browsable via OpenAPI/Swagger/Scalar UI:

- **Offers**: CRUD for cashback offers (`/api/offers`, `/api/offers/:offerId`)
- **User Segments**: CRUD for customer segments (`/api/user-segments`)
- **Banks**: List banks (`/api/banks`)
- **Insights**: Offer and segment analytics (`/api/insights`)
- **Authentication**: Sign in (`/api/auth/signin`)

- OpenAPI JSON: [`/_docs/openapi.json`](http://localhost:3000/_docs/openapi.json)
- Swagger UI: [`/_docs/swagger`](http://localhost:3000/_docs/swagger)
- Scalar UI: [`/_docs/scalar`](http://localhost:3000/_docs/scalar)

## Developer Workflow

### Prerequisites

- Node.js (see `.nvmrc` for version)
- npm

### Setup & Scripts

```sh
npm install           # Install dependencies
npm run dev           # Start development server
npm run build         # Build for production
npm run preview       # Preview production build
npm run lint          # Lint code
npm run typecheck     # Type-check code
npm run test          # Run tests (Vitest)
```

### Code Style & Conventions

- **TypeScript**: Functional, composable, no classes
- **Components**: `<script setup>`, PascalCase, colocated types/helpers/constants
- **Composables**: Named `useXxx`, auto-imported
- **UI**: Use Shadcn Vue (`UiButton`, `UiCard`, etc.), Tailwind for layout/colors
- **Icons**: Use Nuxt Icons (Phosphor set, e.g. `ph:plus`)
- **Images**: Use `<NuxtImg>` or `<NuxtPicture>`
- **Colors**: Only use those defined in `assets/css/tailwind.css`
- **Prettier**: Enforced with Tailwind plugin
- **VSCode**: Recommended extensions in `.vscode/extensions.json`

## Testing & Quality

- **Vitest**: Unit/integration tests (`tests/`)
- **@vue/test-utils**: Component testing
- **happy-dom**: DOM environment for tests
- **Mock Data**: Provided in `mock/data/`
- **CI**: Lint, typecheck, test, and build on PRs (see `.github/workflows/`)

## Deployment & Environment

- **Azure Static Web Apps**: See `.github/workflows/deploy-development-azure.yml`
- **Environment Variables**: No `.env.example` provided; deployment uses Azure secrets for config
- **Local Development**: No special env vars required by default

## Configuration

- Main config: [`nuxt.config.ts`](nuxt.config.ts)
- Tailwind CSS: [`assets/css/tailwind.css`](assets/css/tailwind.css)
- Google Fonts: Configured via `fonts` in Nuxt config
- Shadcn Vue: See `components.json` for config
