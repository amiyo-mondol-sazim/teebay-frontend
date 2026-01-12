# FEATURE ARCHITECTURE

**Location:** `features/`
**Pattern:** Vertical Slicing

## IMPLEMENTATION STRUCTURE

### 1. Create Directory

`features/<feature-name>/`

### 2. Create Container (`containers/`)

- **File**: `containers/<Feature>Container.vue`
- **Purpose**:
  - Fetch data (useQuery).
  - Check permissions.
  - Pass data to dumb components.
- **Code**: NO complex styles. Logic focused.

### 3. Create Components (`components/`)

- **File**: `components/<SubComponent>/<SubComponent>.vue`
- **Purpose**: Render UI based on props. Emit events.
- **Code**: NO API calls. NO global state.

### 4. Support Files (Colocated)

Place these NEXT to the component `.vue` file:

- `.types.ts`: Props/Event interfaces.
- `.helpers.ts`: Pure logic / transformers.
- `.test.ts`: Unit tests.

## INTER-FEATURE RULES

- **Isolation**: Feature A cannot import Feature B.
- **Communication**: Use URL params or Global Stores (rarely) to communicate.
- **Shared**: If logic is needed by both, move to `common/`.
