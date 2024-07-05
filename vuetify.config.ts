import { defineVuetifyConfiguration } from "vuetify-nuxt-module/custom-configuration";

export default defineVuetifyConfiguration({
  labComponents: ["VDateInput", "VNumberInput"],
  locale: {
    locale: "ru",
    fallback: "en",
  },
});
