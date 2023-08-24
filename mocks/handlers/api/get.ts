import { rest } from 'msw'
import serverApi from '@/mocks/handlers/serverApi'

const getMain = rest.get(serverApi('/'), (req, res, ctx) => {
  return res(
    ctx.json({
      ok: true,
      message: 'sccuess',
    })
  )
})

export default getMain
