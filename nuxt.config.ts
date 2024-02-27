// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    [
      "@nuxtjs/eslint-module",
      {
        lintOnStart: false,
      },
    ],
    "@nuxtjs/i18n",
    "@nuxtjs/tailwindcss",
    "vuetify-nuxt-module",
  ],
  runtimeConfig: {
    apiSecret: "",
    public: {
      apiBase: "",
    },
  },
  typescript: {
    strict: true,
    typeCheck: true,
  },
  i18n: {
    locales: [
      {
        code: "en",
        name: "English (US)",
        file: "en-US.ts",
        iso: "en-US",
      },
      {
        code: "ru",
        name: "Русский (Россия)",
        file: "ru-RU.ts",
        iso: "ru-RU",
      },
      {
        code: "uk",
        name: "Українська (Україна)",
        file: "uk-UA.ts",
        iso: "uk-UA",
      },
    ],
    lazy: true,
    langDir: "lang",
    strategy: "prefix_and_default",
    defaultLocale: "ru",
  },
});
