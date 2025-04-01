import { defineVuetifyConfiguration } from "vuetify-nuxt-module/custom-configuration";

export default defineVuetifyConfiguration({
  labComponents: ["VDateInput"],
  locale: {
    locale: "ru",
    fallback: "en",
  },
});
