import { rest } from 'msw'
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

const userInfo = rest.get(serverApi('/info'), (req, res, ctx) => {
  const token = req.url.searchParams.get('token')

  if (!token) {
    return res(
      ctx.status(200),
      ctx.json(serverResponse('FAILURE', 'Login failed, unable to get user details.', '')),
      ctx.delay(100)
    )
  }

  let info

  switch (token) {
    case 'admin-token':
      return res(
        ctx.status(200),
        ctx.json(serverResponse('SUCCESS', 'SUCCESS', users['admin-token'])),
        ctx.delay(100)
      )
    case 'editor-token':
      return res(
        ctx.status(200),
        ctx.json(serverResponse('SUCCESS', 'SUCCESS', users['editor-token'])),
        ctx.delay(100)
      )
    default:
      return res(
        ctx.status(200),
        ctx.json(serverResponse('FAILURE', 'Login failed, unable to get user details.', '')),
        ctx.delay(100)
      )
  }
})

export default userInfo
