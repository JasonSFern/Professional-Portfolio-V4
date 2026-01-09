// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  components: true,

  modules: ['vuetify-nuxt-module'],

  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: './vuetify.config.ts'
  },

  css: ['~/assets/css/tailwind.css', '~/assets/scss/main.scss'],

  build: {
    transpile: ['vuetify', 'three', 'gsap'],
  },

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/_variables.scss" as *;',
        },
      },
    },
  },
})
