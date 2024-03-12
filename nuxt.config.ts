// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  build: {
    transpile: ["vue-debounce"],
  },
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/eslint-module",
    "@nuxtjs/color-mode",
    "@nuxtjs/i18n",
    "@nuxtjs/tailwindcss",
    "@sidebase/nuxt-auth",
    "vuetify-nuxt-module",
  ],
  runtimeConfig: {
    authSecret: process.env.AUTH_SECRET,
    passport: {
      baseUrl: process.env.PASSPORT_BASE_URL,
      clientId: process.env.PASSPORT_CLIENT_ID,
      clientSecret: process.env.PASSPORT_CLIENT_SECRET,
    },
    public: {
      apiBase: "",
    },
  },
  typescript: {
    strict: true,
    typeCheck: true,
  },
  auth: {
    provider: {
      type: "authjs",
    },
  },
  colorMode: {
    preference: "system",
    fallback: "light",
    classSuffix: "",
  },
  eslint: {
    lintOnStart: false,
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
