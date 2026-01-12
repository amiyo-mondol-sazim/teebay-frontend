# FEATURE IMPLEMENTATION GUIDE

**Location:** `features/new-offer/`
**Pattern:** Complex Multi-Step Wizard

## ARCHITECTURE

This directory implements a **Step-Based Form Wizard** pattern. Use this structure for any complex, multi-stage input flow.

## STRUCTURE

### 1. Container (`NewOfferContainer.vue`)

- **Role**: Entry point & Context Provider.
- **Responsibility**:
  - Provides shared stores (e.g., `assetUploadStore`).
  - Handles high-level API submission.
  - Manages routing/redirection on success.

### 2. Orchestrator (`NewOfferForm.vue`)

- **Role**: State Manager & Navigation.
- **Responsibility**:
  - Initializes Form State (`vee-validate`).
  - Manages Steps (Tabs/Navigation).
  - Handles "Next", "Back", "Draft", "Submit" actions.

### 3. Steps (`components/Step*.vue`)

- **Role**: Isolated UI Sections.
- **Responsibility**:
  - Render specific form fields.
  - Connect to the parent Form Context.
  - Validate their own specific schema subset.

## STATE MANAGEMENT

- **Form Engine**: `vee-validate` (`useForm`).
- **Validation**: Zod Schemas defined in `helpers.ts`.
- **Data Flow**:
  1. **UI**: V-model to `useField`.
  2. **Transform**: `mapFormDataToApiPayload` (in `helpers.ts`).
  3. **Submit**: API call via Container.

## IMPLEMENTATION CHECKLIST

- [ ] **Schema**: Define Zod schema in `helpers.ts`.
- [ ] **Types**: Define TypeScript interfaces for Form vs API payload.
- [ ] **Mappers**: Create pure functions to convert Form <-> API.
- [ ] **Components**: Create Step components.
- [ ] **Orchestrator**: Wire steps into the main Form component.
