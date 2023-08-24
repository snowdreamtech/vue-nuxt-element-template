import { $fetch ,FetchRequest, FetchOptions, FetchResponse } from 'ofetch';
import { ElMessage } from 'element-plus'

export function useAPI() {
  const config = useRuntimeConfig()
  console.log("config.public.BASE_URL: "+config.public.BASE_URL)
  const apifetch = $fetch.create({
    credentials: 'include',
    keepalive:true,
    baseURL: config.public.BASE_URL,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Accept-Language': 'zh-Hans',
    },
    retry: 3,
    onRequest({ request, options }) {
      // Set the request headers
      // options.headers = options.headers || {}
      console.log('[fetch request]', request, options)
    },
    onRequestError({ request, options, error }) {
      // Handle the request errors
      console.log('[fetch request error]', request, error)
    },
    onResponse({ request, response, options }) {
      // Process the response data
      console.log('[fetch response]', request, response.status, response.body)
      // console.log('[fetch response]', response)
      const data = response._data

      if(data.code != "SUCCESS"){
        ElMessage.error(data.message)
      }else{
        if(data.message){
          ElMessage.success(data.message)
        }
      }

      return response._data
    },
    onResponseError({ request, response, options }) {
      // Handle the response errors
      console.log('[fetch response error]', request, response.status, response.body)
    }
  })

  return apifetch
}