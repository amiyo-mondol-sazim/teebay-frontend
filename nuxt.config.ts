import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  ssr: false,

  hooks: {
    "prerender:routes": ({ routes }) => {
      routes.clear();
    },
  },

  app: {
    head: {
      title: "Nuxt 3 Feature-Driven Starter",
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.svg" }],
    },
  },
  image: {},

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL,
    },
  },

  devtools: { enabled: true },
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["~/assets/css/tailwind.css"],
  fonts: {
    families: [
      {
        name: "Figtree",
        provider: "google",
        display: "swap",
        weights: [500, 700],
      },
      {
        name: "Plus Jakarta Sans",
        provider: "google",
        display: "swap",
        weights: [400, 500, 600, 700, 800],
      },
    ],
  },
  components: {
    dirs: [
      { path: "~/features", pathPrefix: false },
      { path: "~/common/components", pathPrefix: false, ignore: ["ui/**"] },
    ],
  },
  imports: {
    dirs: [
      "./common/composables/*.{ts,js}",
      "./common/api/*/*.{queries,mutations}.ts",
      "./common/utils/**",
    ],
  },
  shadcn: {
    prefix: "Ui",
    componentDir: "./common/components/ui",
  },
  icon: {
    mode: "svg",
    customCollections: [
      {
        prefix: "custom",
        dir: "./assets/icons",
      },
    ],
  },
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/test-utils/module",
    "shadcn-nuxt",
    "@pinia/nuxt",
  ],
});
