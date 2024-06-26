import { config } from 'dotenv'
import { title, description } from './settings'

const envConfig = config({
  path: `env/.env${process.env.MODE ? `.${process.env.MODE}` : ''}`
})

const conf = envConfig.parsed

// https://github.com/nuxt/nuxt/issues/13803#issuecomment-1397316950
const spa = process.env.MODE === 'prod' || process.argv.includes('--spa')

const debug = process.env.MODE === 'dev'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  ssr: !spa,

  nitro: {
    prerender: {
      crawlLinks: false,
      ignore: [],
      routes: []
    }
  },

  app: {
    baseURL: conf?.BASE_URL ? conf.BASE_URL : '/',
    buildAssetsDir: conf?.BUILD_ASSETS_DIR ? conf.BUILD_ASSETS_DIR : '/_nuxt/',
    cdnURL: conf?.CDN_URL ? conf.CDN_URL : '',

    // head
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
      title,
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
        {
          hid: 'description',
          name: 'description',
          content: description
        }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: conf?.BASE_URL ? conf.BASE_URL + 'favicon.ico' : '/favicon.ico' }]
    }
  },

  runtimeConfig: {
    public: conf,
    app: {
      baseURL: conf?.BASE_URL ? conf.BASE_URL : '/',
      buildAssetsDir: conf?.BUILD_ASSETS_DIR ? conf.BUILD_ASSETS_DIR : '/_nuxt/',
      cdnURL: conf?.CDN_URL ? conf.CDN_URL : ''
    }
  },

  // css
  css: ['normalize.css/normalize.css', '@/styles/index.scss', '@/assets/scss/index.scss'],

  typescript: {
    strict: true,
    shim: false
  },

  // build modules
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@element-plus/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/devtools',
    '@nuxtjs/robots',
    '@nuxtjs/stylelint-module',
    'nuxt-icon',
    '@nuxt/eslint'
  ],

  // vueuse
  vueuse: {
    ssrHandlers: true
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

  // options for @nuxtjs/robots
  robots: {
    /* module options */
    // https://github.com/nuxt-modules/robots/issues/97
    // https://github.com/nuxt-modules/robots/pull/103
    rules:
     {
       UserAgent: '*',
       Allow: '/'
     }
  },

  // options for @nuxt/devtools
  devtools: {
    // Enable devtools (default: true)
    enabled: debug,
    // VS Code Server options
    vscode: {}
    // ...other options
  },

  // options for @nuxtjs/eslint
  // https://nuxt.com/modules/eslint
  eslint: {
    cache: true,
    lintOnStart: true,
    emitWarning: true,
    emitError: true,
    failOnWarning: true,
    failOnError: true,
    eslintPath: 'eslint',
    formatter: 'stylish'
  },

  // options for @nuxtjs/stylelint-module
  // https://nuxt.com/modules/stylelint
  stylelint: {
    cache: true,
    lintOnStart: true,
    emitWarning: true,
    emitError: true,
    failOnWarning: true,
    failOnError: true,
    stylelintPath: 'stylelint',
    formatter: 'string'
  },

  unocss: {
    uno: true,
    attributify: true,
    icons: {
      scale: 1.2
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/element/index.scss" as element;'
        }
      }
    },
    resolve: {
      alias: {
        timers: 'rollup-plugin-node-polyfills/polyfills/timers',
        path: 'rollup-plugin-node-polyfills/polyfills/path'
      }
    }
  },
  elementPlus: {
    icon: 'ElIcon',
    importStyle: 'scss',
    themes: ['dark']
  }
})
