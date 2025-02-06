import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  app: {
    head: {
      titleTemplate: "%s - WB UI",
    },
  },
  build: {
    transpile: ["pinia-orm"],
  },
  css: ["~/assets/css/main.css"],
  compatibilityDate: "2024-07-02",
  devtools: { enabled: true },
  features: { devLogs: false },
  modules: [
    "@nuxt/eslint",
    "@nuxtjs/color-mode",
    "@nuxtjs/i18n",
    "@pinia/nuxt",
    "@pinia-orm/nuxt",
    "@sidebase/nuxt-auth",
    "vuetify-nuxt-module",
  ],
  runtimeConfig: {
    auth: {
      secret: "",
      baseUrl: "",
    },
    user: {
      clientId: "",
      clientSecret: "",
    },
    customer: {
      clientId: "",
      clientSecret: "",
    },
    github: {
      clientId: "",
      clientSecret: "",
    },
    public: {
      apiBase: "",
    },
  },
  typescript: {
    strict: true,
    typeCheck: true,
  },
  vite: {
    esbuild: {
      tsconfigRaw: {
        compilerOptions: {
          experimentalDecorators: true,
        },
      },
    },
    optimizeDeps: {
      include: [
        "countries-list",
        "dayjs",
        "humanize-duration",
        "libphonenumber-js/min/metadata",
        "vue-debounce",
        "@maskito/vue",
        "@maskito/phone",
      ],
    },
    plugins: [tailwindcss()],
  },
  auth: {
    provider: {
      type: "authjs",
    },
  },
  colorMode: {
    preference: "system",
    fallback: "light",
  },
  i18n: {
    locales: [
      {
        code: "en",
        name: "English (US)",
        file: "en-US.ts",
        language: "en-US",
        flag: "US",
      },
      {
        code: "ru",
        name: "Русский (Россия)",
        file: "ru-RU.ts",
        language: "ru-RU",
        flag: "RU",
      },
      {
        code: "uk",
        name: "Українська (Україна)",
        file: "uk-UA.ts",
        language: "uk-UA",
        flag: "UA",
      },
    ],
    lazy: true,
    langDir: "locales",
    strategy: "prefix_and_default",
    defaultLocale: "ru",
  },
});
