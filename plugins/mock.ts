export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig()

  console.log(config.public.MOCK)
  
  if (config.public.MOCK==="msw") {
    if (typeof window === 'undefined') {
      const { server } = await import('../mocks/server')
      server.listen({
        onUnhandledRequest: 'bypass',
      })
    } else {
      const { worker } = await import('../mocks/browser')
      await worker.start({
        serviceWorker: {
          options: {
            // Narrow the scope of the Service Worker to intercept requests
            // only from pages under this path.
            scope: '/vue-nuxt-element-template/'
          }
        },
        onUnhandledRequest: "bypass",
      })
    }
  }
});
