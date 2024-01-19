import { defineVuetifyConfiguration } from "vuetify-nuxt-module/custom-configuration";

export default defineVuetifyConfiguration({
  locale: {
    locale: "ru",
    fallback: "en",
  },
  localeMessages: ["ru", "en"],
});
