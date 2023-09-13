import { $fetch, FetchRequest, FetchOptions, FetchResponse } from 'ofetch'
import { ElMessage } from 'element-plus'

export function useAPI () {
  const config = useRuntimeConfig()

  let baseURL:string = '/'

  if (config.public.MOCK === 'msw') {
    baseURL = '/'
  } else if (config?.public.BASE_API_URL) {
    baseURL = config.public.BASE_API_URL
  } else {
    baseURL = 'http://localhost:8080'
  }

  const apifetch = $fetch.create({
    credentials: 'include',
    keepalive: true,
    baseURL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Language': 'zh-Hans'
    },
    retry: 3,
    onRequest ({ request, options }) {
      // Set the request headers
      // options.headers = options.headers || {}
      // console.log('[fetch request]', request, options)
    },
    onRequestError ({ request, options, error }) {
      // Handle the request errors
      // console.log('[fetch request error]', request, error)
    },
    onResponse ({ request, response, options }) {
      // Process the response data
      // console.log('[fetch response]', request, response.status, response.body)
      // console.log('[fetch response]', response)
      const data = response._data

      if (data.code !== 'SUCCESS') {
        ElMessage.error(data.message)
      } else if (data.message) {
        ElMessage.success(data.message)
      }

      return response._data
    },
    onResponseError ({ request, response, options }) {
      // Handle the response errors
      // console.log('[fetch response error]', request, response.status, response.body)
    }
  })

  return apifetch
}
