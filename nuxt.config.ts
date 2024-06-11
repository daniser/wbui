// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: "%s - WB UI",
    },
  },
  build: {
    transpile: ["pinia-orm", "vue-debounce"],
  },
  devtools: { enabled: true },
  features: { devLogs: false },
  modules: [
    "@nuxt/eslint",
    "@nuxtjs/color-mode",
    "@nuxtjs/i18n",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@pinia-orm/nuxt",
    "@sidebase/nuxt-auth",
    "vuetify-nuxt-module",
  ],
  runtimeConfig: {
    auth: {
      secret: process.env.AUTH_SECRET,
      baseUrl: process.env.AUTH_BASE_URL,
    },
    user: {
      clientId: process.env.USER_CLIENT_ID,
      clientSecret: process.env.USER_CLIENT_SECRET,
    },
    customer: {
      clientId: process.env.CUSTOMER_CLIENT_ID,
      clientSecret: process.env.CUSTOMER_CLIENT_SECRET,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
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
        iso: "en-US",
        flag: "US",
      },
      {
        code: "ru",
        name: "Русский (Россия)",
        file: "ru-RU.ts",
        iso: "ru-RU",
        flag: "RU",
      },
      {
        code: "uk",
        name: "Українська (Україна)",
        file: "uk-UA.ts",
        iso: "uk-UA",
        flag: "UA",
      },
    ],
    lazy: true,
    langDir: "lang",
    strategy: "prefix_and_default",
    defaultLocale: "ru",
  },
});
