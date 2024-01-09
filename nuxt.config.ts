// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
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
