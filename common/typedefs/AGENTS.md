# TYPEDEFS IMPLEMENTATION

**Context:** Global TypeScript Definitions
**Role:** Shared types, interfaces, and enums

## ARCHITECTURE

Central repository for types used across multiple boundaries (API, Common Components, Global Config).

## FILE ROLES

- `api-schema.ts`: **READ-ONLY**. Auto-generated from OpenAPI.
- `enums.ts`: Global application enums (e.g., Role types, Statuses).
- `utils.ts`: Generic utility types (Helpers, Generics).

## IMPLEMENTATION RULES

### 1. Component Props

- **Forbidden**: Do NOT put component props here.
- **Correct**: Colocate props in `[Component].types.ts` next to the component.

### 2. API Types

- **Forbidden**: Manual typing of API responses.
- **Correct**: Import from `api-schema.ts`.

### 3. Naming

- Interfaces: `I` prefix is optional but keep it consistent.
- Types: PascalCase.

## WORKFLOW

To update API types:

1. Update `assets/openapi.yml`
2. Run `npm run generate:types`
