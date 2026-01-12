# PROJECT KNOWLEDGE BASE

**Generated:** 2026-01-12
**Type:** Nuxt 3 SPA (Feature-Based)

## OVERVIEW

Nuxt 3 Single Page Application (`ssr: false`) using a **Feature-Driven Architecture**.

- **Tech Stack**: TypeScript, Tailwind CSS 4, Shadcn Vue, Pinia, Vue Query.
- **Pattern**: Vertical Slicing (Features) + Horizontal Layering (Common).

## STRUCTURE

```
.
├── features/         # Domain-specific modules (Self-contained)
│   ├── */containers/ # Smart components (Data fetching, State, Routing)
│   └── */components/ # Dumb UI components (Presentation, Props, Events)
├── common/           # Shared core infrastructure
│   ├── api/          # Centralized API layer (OpenAPI + Vue Query)
│   ├── components/   # Shared UI Library (Shadcn - prefixed 'Ui')
│   └── composables/  # Global shared logic (Auth, UI State)
├── pages/            # Routing layer (Mounts Feature Containers)
└── assets/           # Static assets & global styles
```

## IMPLEMENTATION GUIDE

| Task                | Implementation Location                                                             |
| ------------------- | ----------------------------------------------------------------------------------- |
| **New Feature**     | Create `features/<name>/`. Split logic (`containers/`) vs UI (`components/`).       |
| **New Screen**      | Create `pages/<path>/index.vue`. Import/Mount Feature Container.                    |
| **API Integration** | 1. Update `assets/openapi.yml` 2. `npm run generate:types` 3. Add to `common/api/`. |
| **Shared UI**       | Add to `common/components/ui/`. Use `Ui` prefix.                                    |
| **Global State**    | Use `stores/` (Pinia) only for app-wide sessions. Prefer local composables.         |

## CONVENTIONS

- **Architecture**: Logic in `features/`, reusable code in `common/`.
- **Components**: PascalCase. `<script setup>`. No Classes.
- **Styling**: **Tailwind CSS 4** only. No raw colors (use variables).
- **Colocation**: Keep `.types.ts`, `.helpers.ts`, `.test.ts` next to the component.
- **Types**: Never edit `api-schema.ts` manually.

## COMMANDS

```bash
npm run dev             # Start dev server
npm run generate:types  # Regenerate API types
npm run test            # Run Vitest
```
