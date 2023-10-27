import { http } from 'msw'
import serverApi from '@/mocks/handlers/serverApi'

const getMain = http.get(serverApi('/'), (info) => {
  return res(
    ctx.json({
      ok: true,
      message: 'sccuess'
    })
  )
})

export default getMain
