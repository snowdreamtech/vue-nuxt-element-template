export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig()

  if (config.public.MOCK === 'msw') {
    const { mockServer } = await import('../mocks/server')
    mockServer()
  }
})
