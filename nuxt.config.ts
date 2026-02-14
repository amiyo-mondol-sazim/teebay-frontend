import tailwindcss from "@tailwindcss/vite";

const FONT_WEIGHTS: (number | string)[] = [400, 500, 600, 700];

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
      wsUrl: process.env.NUXT_PUBLIC_WS_URL,
    },
  },

  devtools: { enabled: true },
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ["jimena-chameleonic-yuk.ngrok-free.dev"],
    },
  },
  css: ["~/assets/css/tailwind.css"],
  fonts: {
    families: [
      {
        name: "JetBrains Mono",
        provider: "google",
        display: "swap",
        weights: FONT_WEIGHTS,
      },
      {
        name: "Inter",
        provider: "google",
        display: "swap",
        weights: FONT_WEIGHTS,
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
      "./common/utils/**/*.{ts,js}",
      "./common/typedefs/**/*.{ts,js}",
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
