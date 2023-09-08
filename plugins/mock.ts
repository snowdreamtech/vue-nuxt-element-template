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
          url: '/vue-nuxt-element-template/mockServiceWorker.js',
        },
        onUnhandledRequest: "bypass",
      })
    }
  }
});
