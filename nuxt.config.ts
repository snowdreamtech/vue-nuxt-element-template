import dotenv from "dotenv";
import { title, description } from "./settings";

const envConfig = dotenv.config({
  path: `env/.env${process.env.MODE ? `.${process.env.MODE}` : ""}`,
});

const config = envConfig.parsed;

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
    // head
    head: {
      charset: "utf-8",
      viewport:
        "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
      title: title,
      meta: [
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
        },
        {
          hid: "description",
          name: "description",
          content: description,
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  runtimeConfig: {
    public: config,
    app: {
      baseURL: "/",
      buildAssetsDir: "/_nuxt/",
      cdnURL: "",
    },
  },

  // css
  css: [
    "normalize.css/normalize.css",
    "@/styles/index.scss",
    "@/assets/scss/index.scss",
  ],

  typescript: {
    strict: true,
    shim: false,
  },

  // build modules
  modules: [
    "@vueuse/nuxt",
    "@unocss/nuxt",
    "@pinia/nuxt",
    "@element-plus/nuxt",
    "@nuxtjs/i18n",
    "@nuxtjs/color-mode",
    "nuxt-icon",
  ],

  i18n: {
    legacy: false,
    debug: true,
    locale: "en",
    defaultLocale: "en",
    strategy: "no_prefix",
    // strategy: 'prefix',
    // strategy: 'prefix_and_default',
    // strategy: 'prefix_except_default',
    // rootRedirect: '/ja/about-ja',
    langDir: "languages",
    lazy: false,
    baseUrl: config?.PUBLIC_URL || "http://localhost:3000",
    locales: [
      {
        code: "en",
        files: ["en-element.ts", "en.ts"],
      },
      {
        code: "zh",
        files: ["zh-element.ts", "zh.ts"],
      },
      {
        code: "es",
        files: ["es-element.ts", "es.ts"],
      },
      {
        code: "ja",
        files: ["ja-element.ts", "ja.ts"],
      },
    ],
    // customRoutes: 'config',
    // pages: {
    //  history: {
    //   ja: '/history-ja'
    //  },
    //  about: {
    //   ja: '/about-ja'
    //  }
    // },
    // differentDomains: true,
    skipSettingLocaleOnNavigate: true,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "language",
      redirectOn: "root", // recommended
    },
    experimental: {
      jsTsFormatResource: true,
    },
    compilation: {
      // jit: false,
      strictMessage: false,
      escapeHtml: true,
    },
    bundle: {
      // dropMessageCompiler: true
    },
    vueI18n: "./i18n.config.ts",
  },

  // vueuse
  vueuse: {
    ssrHandlers: true,
  },

  // colorMode
  colorMode: {
    preference: "system", // default value of $colorMode.preference
    fallback: "light", // fallback value if not system preference found
    hid: "nuxt-color-mode-script",
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
    classPrefix: "",
    classSuffix: "",
    storageKey: "nuxt-color-mode",
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
    icon: "ElIcon",
    importStyle: "scss",
    themes: ["dark"],
  },
});
