# API LAYER IMPLEMENTATION

**Scope:** Centralized API Integration
**Stack:** OpenAPI Fetch + Vue Query

## ARCHITECTURE

The API layer acts as a typed bridge between Backend OpenAPI specs and Frontend components.

## IMPLEMENTATION FLOW

### 1. Schema Update

- Modify `assets/openapi.yml` to reflect backend changes.
- Run `npm run generate:types` to update `common/typedefs/api-schema.ts`.

### 2. Key Factory (`*.keys.ts`)

- Define reactive query keys for caching.
- **Pattern**:

```typescript
export const entityKeys = {
  all: ["entity"] as const,
  lists: () => [...entityKeys.all, "list"] as const,
  detail: (id: MaybeRef<string>) => [...entityKeys.all, "detail", id] as const,
};
```

### 3. Query/Mutation Hook (`*.queries.ts` / `*.mutations.ts`)

- Implement the actual fetch call using `client`.
- Wrap in `useQuery` or `useMutation`.
- **Pattern**:

```typescript
export function useEntityList(params: Params) {
  return useQuery({
    queryKey: entityKeys.list(params),
    queryFn: () => client.GET("/api/entities", { params }),
  });
}
```

## CONVENTIONS

- **Client**: Always import `client` from `../client.ts`.
- **Error Handling**: Handle API errors in the hook or global interceptor.
- **Type Safety**: Rely strictly on generated types. Do not manually type responses.
