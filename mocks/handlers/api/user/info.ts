import { http, HttpResponse, delay } from 'msw'
import serverApi from '@/mocks/handlers/serverApi'
import serverResponse from '@/mocks/handlers/serverResponse'

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar:
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar:
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

const userInfo = http.get(serverApi('/info'), async ({ request }) => {
  const url = new URL(request.url)
  const token = url.searchParams.get('token')
  if (!token) {
    await delay(100)
    return HttpResponse.json(serverResponse('FAILURE', 'Login failed, unable to get user details.', ''))
  }

  let info

  switch (token) {
    case 'admin-token':
      await delay(100)
      return HttpResponse.json(serverResponse('SUCCESS', 'SUCCESS', users['admin-token']))
    case 'editor-token':
      await delay(100)
      return HttpResponse.json(serverResponse('SUCCESS', 'SUCCESS', users['editor-token']))
    default:
      await delay(100)
      return HttpResponse.json(serverResponse('FAILURE', 'Login failed, unable to get user details.', ''))
  }
})

export default userInfo
