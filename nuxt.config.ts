// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
  ],
  css: ['@fortawesome/fontawesome-free/css/all.css', '@/assets/scss/global.scss'],
})
