ARG NODE_VERSION=22.16

# Stage 1: Dependencies
FROM node:${NODE_VERSION}-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Stage 2: Builder
FROM node:${NODE_VERSION}-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Production Runner
FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app
ENV NUXT_PUBLIC_API_BASE_URL=""
ENV HOST="0.0.0.0"
ENV PORT=3000
COPY --from=builder /app/.output ./
EXPOSE 3000
CMD ["node", "server/index.mjs"]
