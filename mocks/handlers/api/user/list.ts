import { http, HttpResponse, delay } from 'msw'
import serverApi from '@/mocks/handlers/serverApi'
import serverResponse from '@/mocks/handlers/serverResponse'

const listUsers = http.get(serverApi('/users'), async () => {
  await delay(100)
  return HttpResponse.json(serverResponse('SUCCESS', 'SUCCESS', {
    users: [
      {
        id: 1,
        name: 'hogehoge'
      },
      {
        id: 2,
        name: 'fugafuga'
      },
      {
        id: 3,
        name: 'piyopiyo'
      }
    ]
  }))
})

export default listUsers
