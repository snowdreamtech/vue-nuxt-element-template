import dotenv from 'dotenv'
import { title, description } from "./settings";

const envConfig = dotenv.config({
  path: `env/.env${process.env.MODE ? `.${process.env.MODE}` : ''}`
})

const config = envConfig.parsed

//https://github.com/nuxt/nuxt/issues/13803#issuecomment-1397316950
const spa = process.env.MODE === 'prod' || process.argv.includes("--spa");

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  ssr: !spa,

  nitro: {
    prerender: {
      crawlLinks: false,
      ignore: [],
      routes: [],
    },
  },

  app: {
    baseURL: config?.BASE_URL?config.BASE_URL:"/",
    buildAssetsDir: config?.BUILD_ASSETS_DIR?config.BUILD_ASSETS_DIR:"/_nuxt/",
    cdnURL: config?.CDN_URL?config.CDN_URL:"",  
    
    // head
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
      title: title,
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
        {
          hid: 'description',
          name: 'description',
          content: description,
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    }
  },

  runtimeConfig: {
    public: config,
    app: {
      baseURL: config?.BASE_URL?config.BASE_URL:"/",
      buildAssetsDir: config?.BUILD_ASSETS_DIR?config.BUILD_ASSETS_DIR:"/_nuxt/",
      cdnURL: config?.CDN_URL?config.CDN_URL:"",  
    },
  },
  
  // css
  css: ['normalize.css/normalize.css','@/styles/index.scss','@/assets/scss/index.scss'],

  typescript: {
    strict: true,
    shim: false,
  },

  // build modules
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@element-plus/nuxt',
    '@nuxtjs/color-mode',
    'nuxt-icon'
  ],

  // vueuse
  vueuse: {
    ssrHandlers: true,
  },

  // colorMode
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  },

  unocss: {
    uno: true,
    attributify: true,
    icons: {
      scale: 1.2,
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/scss/element/index.scss" as element;`,
        },
      },
    },
    resolve: {
      alias: {
        timers: 'rollup-plugin-node-polyfills/polyfills/timers',
        path: 'rollup-plugin-node-polyfills/polyfills/path',
      },
    }, 
  },
  elementPlus: {
    icon: 'ElIcon',
    importStyle: 'scss',
    themes: ['dark'],
  },
})
