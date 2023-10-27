export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig()
  const baseURL = config?.public.BASE_URL ? config.public.BASE_URL as string : '/'

  if (config.public.MOCK === 'msw') {
    const { mockBrowser } = await import('../mocks/browser')
    mockBrowser({ baseURL })
  }
})
