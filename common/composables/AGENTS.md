# GLOBAL COMPOSABLES IMPLEMENTATION

**Context:** App-wide Shared Logic
**Role:** Reusable stateful logic (Vue 3 Composition API)

## ARCHITECTURE

Logic shared across MULTIPLE features or global app concerns (e.g., Auth, UI State, Theme).

## IMPLEMENTATION RULES

### 1. Scoping

- **Global**: `common/composables/` (Used by >1 feature).
- **Local**: `features/*/components/*/composables.ts` (Used by 1 feature).

### 2. Naming

- Must start with `use` (e.g., `useSidebar`).
- File name must match export name.

### 3. Structure

- Return a plain object or array of refs/functions.
- Avoid side effects outside the function body.

## TESTING

- **Requirement**: MUST have unit tests (`.test.ts`).
- **Focus**: Test state changes and return values, not UI rendering.

## ANTI-PATTERNS

- **No UI**: Do not return render functions or JSX.
- **No Feature Leakage**: Don't put domain-specific business logic here if used in only one place.
