// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    'vuetify-nuxt-module'
  ],
  runtimeConfig: {
    apiSecret: '',
    public: {
      apiBase: ''
    }
  },
  typescript: {
    strict: true,
    typeCheck: true
  }
})
