import { http, HttpResponse, delay } from 'msw'
import { faker } from '@faker-js/faker'
import serverApi from '@/mocks/handlers/serverApi'
import serverResponse from '@/mocks/handlers/serverResponse'

type Status = 'published'| 'draft'| 'deleted'

const count = 30
const List = [] as {
  id:number,
  title: string,
  username:string,
  status:Status,
  author:string,
  display_time: Date,
  pageviews: number
}[]

for (let i = 0; i < count; i++) {
  List.push({
    id: i,
    title: faker.lorem.word(),
    username: faker.lorem.word(),
    status: faker.helpers.arrayElement(['published', 'draft', 'deleted']),
    author: faker.lorem.word(),
    display_time: faker.date.recent(),
    pageviews: faker.number.int({ min: 300, max: 5000 })
  })
}

const data = {
  total: List.length,
  items: List
}

const listTables = http.get(serverApi('/tables'), async () => {
  await delay(100)
  return HttpResponse.json(serverResponse('SUCCESS', 'SUCCESS', data))
})

export default listTables
