import { http, HttpResponse, delay } from 'msw'
import serverApi from '@/mocks/handlers/serverApi'
import serverResponse from '@/mocks/handlers/serverResponse'

const userLogout = http.post(serverApi('/logout'), async () => {
  await delay(500)
  return HttpResponse.json(serverResponse('SUCCESS', 'SUCCESS', ''))
})

export default userLogout
