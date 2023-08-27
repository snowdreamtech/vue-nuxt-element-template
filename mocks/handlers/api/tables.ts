import { rest } from 'msw'
import serverApi from '@/mocks/handlers/serverApi'
import serverResponse from "@/mocks/handlers/serverResponse";
import { faker } from '@faker-js/faker';

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

type Status = 'published'| 'draft'| 'deleted'


for (let i = 0; i < count; i++) {
    List.push({
      id: i,
      title: faker.lorem.word(),
      username:faker.lorem.word(),
      status: faker.helpers.arrayElement(['published', 'draft', 'deleted']),
      author:faker.lorem.word(),
      display_time: faker.date.recent(),
      pageviews: faker.number.int({ min: 300, max: 5000 })
    })
  }

  const data = {
    total: List.length,
    items: List,
  }
  
const listTables = rest.get(serverApi('/tables'), (req, res, ctx) => {
    return res(
        ctx.status(200),
        ctx.json(serverResponse("SUCCESS", "SUCCESS", data)),
        ctx.delay(100)
      );
})

export default listTables
