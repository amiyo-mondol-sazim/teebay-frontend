# SHARED UI IMPLEMENTATION

**Library:** Shadcn Vue (Radix Vue + Tailwind)
**Location:** `common/components/`

## ARCHITECTURE

- **Primitive-Based**: Components are built on accessible primitives (Radix).
- **Style-Agnostic Logic**: Logic lives in Radix; styling lives in Tailwind classes.

## IMPLEMENTATION RULES

### 1. Naming & Location

- **Prefix**: MUST use `Ui` (e.g., `UiButton`).
- **Path**: `common/components/ui/<Name>.vue`.

### 2. Component Structure

- **Props**: Define strictly with `interface Props`.
- **Classes**: Always allow class overrides via `cn()` utility.

```vue
<template>
  <div :class="cn('base-classes', props.class)">
    <slot />
  </div>
</template>
```

### 3. Icon Usage

- Use `<Icon name="ph:<name>" />`.
- Do NOT import SVGs manually.

### 4. Form Components

- Wrap inputs in `UiFormField` > `UiFormItem` > `UiFormControl`.
- This ensures automatic error message rendering and label association.
