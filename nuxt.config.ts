// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  build: {
    transpile: ['vuetify']
  },
  devtools: { enabled: true },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    }
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
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls
      }
    }
  }
})
