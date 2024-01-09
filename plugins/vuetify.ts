// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

import { ru, en } from 'vuetify/locale'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    locale: {
      locale: 'ru',
      fallback: 'en',
      messages: { ru, en }
    },
    ssr: true
  })
  app.vueApp.use(vuetify)
})
