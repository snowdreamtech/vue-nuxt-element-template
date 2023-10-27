import { setupWorker } from 'msw/browser'
import path from 'path-browserify'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)

export function mockBrowser (config:any) {
  worker.start({
    serviceWorker: {
      url: path.resolve(config.baseURL, 'mockServiceWorker.js')
    },
    onUnhandledRequest: 'bypass'
  })
}
