# Nuxt 3 Feature-Driven Starter

A robust, modular **Nuxt 3** starter template built with a **Feature-Driven Architecture**, **Tailwind CSS 4**, and **Shadcn Vue**.

## 🚀 Features

- **Feature-Driven Architecture**: Modular `features/` directory structure for scalable development.
- **Nuxt 3**: SSR, Auto-imports, Modules.
- **TypeScript**: Fully typed codebase.
- **Tailwind CSS 4**: Next-gen utility-first CSS.
- **Shadcn Vue**: Accessible, customizable UI components.
- **Pinia**: State management.
- **Vue Query**: Server state management.
- **OpenAPI**: Typed API client generation.
- **Vitest**: Unit testing setup.

## 📂 Project Structure

```
.
├── features/         # Domain-specific modules (Auth, etc.)
│   ├── */containers/ # Smart components (Logic, Data)
│   └── */components/ # Dumb components (UI only)
├── common/           # Shared utilities and components
│   ├── api/          # API Client & Typedefs
│   ├── components/   # Shared UI (Shadcn)
│   └── composables/  # Global composables
├── pages/            # File-based routing (thin wrappers)
└── assets/           # Static assets & Global CSS
```

## 🛠️ Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🧩 Adding a New Feature

1. Create `features/my-feature/`.
2. Add `containers/MyFeatureContainer.vue`.
3. Add `components/MyFeatureComponent.vue`.
4. Create a page in `pages/my-feature/index.vue` that mounts the container.

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run type check
npm run typecheck
```

## 📝 API Integration

1. Update `assets/openapi.yml` with your backend spec.
2. Run `npm run generate:types` to regenerate TypeScript definitions.
3. Use the typed client in `common/api/`.
