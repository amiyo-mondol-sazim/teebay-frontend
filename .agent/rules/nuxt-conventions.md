---
trigger: always_on
---

# Project Rules & Conventions

You are working on a Nuxt.js project. Adhere to the following rules at all times.

## Technology Stack

- **Framework**: Nuxt (Vue.js)
- **UI Component Library**: Shadcn UI for Vue (shadcn-vue) - _Compatible with Tailwind v4_
- **Styling**: Tailwind CSS (Use `rem`/`em` units, avoid `px`. Spacing should be divisible by 4)
- **Date Handling**: Use `date-fns` or `dayjs`. **NEVER** use the native `Date` constructor.
- **State Management**: TanStack Query (Vue Query) for API interactions.

## Directory Structure & Architecture

- **Feature-Based Architecture**:
  - Domain logic resides in `features/<domain_name>/`.
  - Subdirectories: `components`, `containers`, `composables`, `api`.
  - Shared code: `features/shared/`.
- **Shadcn Components**: Located in `features/shared/components/shadcnui/`.
- **Auto-Imports**: ALWAYS rely on Nuxt auto-imports for components, composables, and utils. Do not manually import them unless necessary.

### Structure Reference

```
project-root/
├── features/
│   ├── <feature-name>/
│   │   ├── components/    # Dumb components (PascalCase)
│   │   ├── containers/    # Smart components/Page containers
│   │   ├── composables/   # Feature specific logic
│   │   └── api/           # Feature specific queries/mutations
│   └── shared/            # Shared components/utils
├── pages/                 # Thin wrappers around containers
└── layouts/               # App layouts
```

## Component & File Guidelines

- **Root Element**: Pages and Layout commercial/layouts MUST have **exactly one** root element.
- **Naming Conventions**:
  - **Page/Layout Files**: `kebab-case.vue` (e.g., `user-dashboard.vue`)
  - **Regular Components**: `PascalCase.vue` (e.g., `UserCard.vue`)
  - **Composables**: `camelCase.ts` (e.g., `useCustomHook.ts`)
  - **Constants**: `SNAKE_CASE_CAPS` (e.g., `WINDOW_SIZE`)
  - **Interfaces**: `IPascalCase` (e.g., `IProduct`)
  - **Types**: `TPascalCase` (e.g., `TProduct`)
  - **Enums**: `EPascalCase` (e.g., `ERoles`)
  - **Props**: `IProps` or `TProps`.

## Coding Standards

1.  **No Magic Values**: Extract strings and numbers to constants.
2.  **Enums**: Prefer `enum` over string literals.
3.  **Conditionals**: Prefer ternary operators (`a ? b : c`) over short-circuit evaluation (`a && b`) for side effects or conditional rendering.
4.  **Resulsability**: Before building new components, check `features/shared` or existing feature components.
5.  **Routing**: Define paths in a central routes file (if applicable) or use strong typing for links.
6.  **Composables Style**: Use arrow functions for composables.
    ```ts
    export const useSomeTool = () => { ... }
    ```
7.  **Helper Functions**: Use regular functions for helpers to allow hoisting.
    ```ts
    export function helperFunction() { ... }
    ```

## Project Setup Notes

- Run `npm run dev` to start the server.
- Do not modify `Nuxt Conventions Doc.md`; these rules reflect it.
