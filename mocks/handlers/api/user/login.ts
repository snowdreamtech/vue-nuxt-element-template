import { http, HttpResponse, delay } from 'msw'
import serverApi from '@/mocks/handlers/serverApi'
import serverResponse from '@/mocks/handlers/serverResponse'

const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

interface LoginData{
  username: string;
  password: string;
};

const userLogin = http.post(serverApi('/login'), async ({ request }) => {
  const url = new URL(request.url)
  const type = url.searchParams.get('type')
  // console.log('login type: ' + type)

  // Read the request body as JSON.
  const data = await request.json() as LoginData
  // console.log("login data: ");
  // console.log(data);
  // console.log(data.username);
  const { username } = data

  if (data.username === '') {
    await delay(100)
    return HttpResponse.json(serverResponse('FAILURE', 'Account and password are incorrect.', ''))
  }

  switch (username) {
    case 'admin':
      await delay(100)
      return HttpResponse.json(serverResponse('SUCCESS', 'SUCCESS', tokens.admin.token))
    case 'editor':
      await delay(100)
      return HttpResponse.json(serverResponse('SUCCESS', 'SUCCESS', tokens.editor.token))
    default:
      await delay(100)
      return HttpResponse.json(serverResponse('FAILURE', 'Account and password are incorrect.', ''))
  }
})

export default userLogin
