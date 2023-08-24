export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig()

  console.log(config.public.MOCK)
  
  if (config.public.MOCK==="msw") {
    if (typeof window === 'undefined') {
      const { server } = await import('../mocks/server')
      server.listen()
    } else {
      const { worker } = await import('../mocks/browser')
      await worker.start({
        onUnhandledRequest: "bypass",
      })
    }
  }
});
