// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@invictus.codes/nuxt-vuetify',
  ],
  modulesDir: ['~/node_modules'],
  dir: {
    pages: 'feature/heroes-crud/presentation/pages',
    layouts: 'feature/heroes-crud/presentation/layouts',
    middleware: 'core/middleware',
    plugins: 'core/plugins',
  },
  components: [
    '~/feature/heroes-crud/presentation/components',
  ],
  routeRules: {
    '/': { 'redirect': '/heroes-crud/home' }
  },
  vuetify: {
    /* vuetify options */
    vuetifyOptions: {
      ssr: true,
    },

    moduleOptions: {
      /* nuxt-vuetify module options */
      treeshaking: true,
      // useIconCDN: true | false,

      /* vite-plugin-vuetify options */
      // styles: true | 'none' | 'expose' | 'sass' | { configFile: string },
      autoImport: true,
    },
  },

  ssr: true,
  runtimeConfig: {
    public: {
      API_TOKEN: process.env.API_TOKEN,
      API_URL: process.env.API_URL
    }
  }
})
