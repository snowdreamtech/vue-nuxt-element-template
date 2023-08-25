import { rest } from 'msw'
import serverApi from '@/mocks/handlers/serverApi'

const listUsers = rest.get(serverApi('/users'), (req, res, ctx) => {
    return res(
        ctx.status(200),
        ctx.json({
          users: [
            {
              id: 1,
              name: "hogehoge",
            },
            {
              id: 2,
              name: "fugafuga",
            },
            {
              id: 3,
              name: "piyopiyo",
            },
          ],
        }),
        ctx.delay(100)
      );
})

export default listUsers
