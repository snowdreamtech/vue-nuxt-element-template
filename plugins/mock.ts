import path from 'path-browserify'

export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig()
  const baseURL = config?.public.BASE_URL ? config.public.BASE_URL as string : '/'

  // console.log(config.public.MOCK)

  if (config.public.MOCK === 'msw') {
    if (typeof window === 'undefined') {
      const { server } = await import('../mocks/server')
      server.listen({
        onUnhandledRequest: 'bypass'
      })
    } else {
      const { worker } = await import('../mocks/browser')
      await worker.start({
        serviceWorker: {
          url: path.resolve(baseURL, 'mockServiceWorker.js')
        },
        onUnhandledRequest: 'bypass'
      })
    }
  }
})
