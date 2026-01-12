# UTILS IMPLEMENTATION

**Context:** Pure Helper Functions
**Role:** Stateless logic and formatting

## ARCHITECTURE

Domain-agnostic helpers for data manipulation (Currency, Dates, String formatting).

## IMPLEMENTATION RULES

### 1. Purity

- Functions MUST be pure (deterministic, no side effects).
- No API calls, no global state access.

### 2. Exports

- **Named Exports Only**: `export function formatDate...`.
- No `export default`.

### 3. Testing

- **Mandatory**: 100% test coverage expected.
- **Focus**: Edge cases, null handling.

### 4. Colocation

- If a util is only used by one component, put it in `features/*/components/*/helpers.ts`.
- Move to `common/utils/` ONLY when reused.

## COMMON PATTERNS

- `date.ts`: Formatting, duration calc.
- `currency.ts`: Cents <-> Dollars conversion.
- `css.ts`: Class merging (`cn`).
