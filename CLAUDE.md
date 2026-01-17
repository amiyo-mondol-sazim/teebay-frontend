# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Teebay is a **Nuxt 3 SPA** (SSR disabled) built with **Feature-Driven Architecture**. It's a rental/e-commerce platform for product rental management with a strong focus on type safety and modular development.

**Tech Stack:** Nuxt 3, TypeScript, Tailwind CSS 4, Shadcn Vue, Pinia, TanStack Query (Vue Query), VeeValidate + Zod, Vitest.

## Common Commands

```bash
# Development
npm run dev              # Start dev server

# Build & Quality
npm run build           # Production build
npm run preview         # Preview production build
npm run typecheck       # TypeScript type checking
npm run lint            # ESLint
npm run lint:fix        # ESLint with auto-fix

# Testing
npm run test            # Run Vitest unit tests

# API Types (IMPORTANT: Run after OpenAPI spec changes)
npm run generate:types  # Regenerate types from assets/openapi.yml
```

## Architecture

### Feature-Driven Structure

The codebase follows **vertical slicing** by domain with **horizontal layering** for shared code:

```
project/
├── features/              # Domain-specific modules (self-contained)
│   ├── <feature>/
│   │   ├── containers/    # Smart components (data fetching, state, routing)
│   │   ├── components/    # Dumb UI components (presentation, props, events)
│   │   ├── composables/   # Feature-specific logic
│   │   └── api/           # Feature-specific queries/mutations
│   └── shared/            # Shared feature components
├── common/                # Shared infrastructure
│   ├── api/               # Typed API client (OpenAPI + Vue Query)
│   ├── components/        # Shared UI (Shadcn - prefixed 'Ui')
│   ├── composables/       # Global shared logic (auth, UI state)
│   ├── typedefs/          # Auto-generated API types (DO NOT EDIT)
│   └── utils/             # Utility functions
├── pages/                 # File-based routing (thin wrappers that mount containers)
├── layouts/               # Application layouts
└── assets/                # Static assets, CSS, OpenAPI spec
```

### Smart/Dumb Component Pattern

- **Containers** (`containers/`): Smart components that handle data fetching (useQuery), permissions, and business logic. Minimal styling.
- **Components** (`components/`): Dumb UI-only components. No API calls, no global state. Pure presentation based on props and events.

### Auto-Import System

Nuxt auto-imports from:
- `~/features/**/components/*.vue` (components)
- `~/common/components/**/*.vue` (except `ui/**`)
- `~/common/composables/*.{ts,js}` (composables)
- `~/common/api/**/*.queries.ts` (queries)
- `~/common/api/**/*.mutations.ts` (mutations)
- `~/common/utils/**/*.{ts,js}` (utilities)
- `~/common/typedefs/**/*.{ts,js}` (types)

**Never manually import these** unless absolutely necessary.

## Naming Conventions

- **Pages/Layouts:** `kebab-case.vue`
- **Components:** `PascalCase.vue`
- **Composables:** `camelCase.ts`
- **Constants:** `SNAKE_CASE_CAPS`
- **Interfaces:** `IPascalCase`
- **Types:** `TPascalCase`
- **Enums:** `EPascalCase`

## API Integration Workflow

1. Update `assets/openapi.yml` with backend changes
2. Run `npm run generate:types` to regenerate `common/typedefs/api-schema.ts`
3. Create query keys in `common/api/*/*.keys.ts`
4. Implement queries/mutations in `common/api/*/*.queries.ts` or `*.mutations.ts`

**Pattern:**
```typescript
// keys.ts
export const entityKeys = {
  all: ["entity"] as const,
  lists: () => [...entityKeys.all, "list"] as const,
  detail: (id: MaybeRef<string>) => [...entityKeys.all, "detail", id] as const,
};

// queries.ts
export function useEntityList(params: Params) {
  return useQuery({
    queryKey: entityKeys.list(params),
    queryFn: () => client.GET("/api/entities", { params }),
  });
}
```

## Feature Implementation Rules

### Creating a New Feature

1. Create `features/<feature-name>/`
2. Add `containers/<Feature>Container.vue` (smart, data-focused)
3. Add `components/<Component>/<Component>.vue` (dumb, UI-focused)
4. Create page in `pages/<path>/index.vue` that mounts the container
5. Colocate support files next to components: `.types.ts`, `.helpers.ts`, `.test.ts`

### Inter-Feature Communication

- **Isolation:** Feature A cannot import Feature B
- **Communication:** Use URL params or global stores (rarely)
- **Shared Logic:** Move to `common/` if needed by multiple features

## Coding Standards

- **Date Handling:** Use `date-fns` or `dayjs`. **NEVER** use native `Date`
- **Styling:** Use Tailwind CSS with `rem`/`em` units (avoid `px`). Spacing divisible by 4
- **Icons:** Use `<Icon name="ph:<name>" />` or `lucide-vue-next` icons
- **Forms:** Wrap inputs in `UiFormField` > `UiFormItem` > `UiFormControl`
- **Conditionals:** Prefer ternary over short-circuit for side effects/rendering
- **Composables:** Use arrow functions `export const useX = () => {}`
- **Helpers:** Use regular functions `export function helper() {}` for hoisting
- **Enums:** Prefer `enum` over string literals
- **No Magic Values:** Extract to constants

## UI Components

- **Shadcn Location:** `common/components/ui/`
- **Prefix:** MUST use `Ui` (e.g., `UiButton`)
- **Overrides:** Always allow class overrides via `cn()` utility

```vue
<template>
  <div :class="cn('base-classes', props.class)">
    <slot />
  </div>
</template>
```

## State Management

- **Server State:** Use TanStack Query (Vue Query) for API data
- **Client State:** Use Pinia stores only for app-wide sessions (auth, theme)
- **Local State:** Prefer feature-level composables over global stores

## Testing

- **Framework:** Vitest with HappyDOM
- **Config:** `vitest.config.ts` uses `happy-dom` environment
- **Setup:** `tests/setup.ts`
- **Composables:** MUST have unit tests (`.test.ts`). Test state changes, not UI rendering

## Important Notes

- **Root Element:** Pages and Layouts MUST have exactly one root element
- **Colocation:** Keep `.types.ts`, `.helpers.ts`, `.test.ts` next to component files
- **Type Safety:** Never edit `api-schema.ts` manually - it's auto-generated
- **Reusability:** Check `features/shared` and existing features before building new components
- **Node Version:** Requires Node.js >=22.16.0
