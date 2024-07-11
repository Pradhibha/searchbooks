// server-handlers.js
// this is put into here so I can share these same handlers between my tests
// as well as my development in the browser. Pretty sweet!
import { rest } from 'msw' // msw supports graphql too!
import BooksData from './mock_data/data.json'
import 'whatwg-fetch'
const handlers = [
  rest.get('/api/books', (req, res, ctx) => {
    // respond using a mocked JSON body
    console.log(`Request URL ${req.url.toString()}`)
    return res(ctx.json(BooksData))
  }),
  rest.post(`/api/books`, (req, res, ctx) => {
    console.log(`Request URL ${req.url.toString()}`)
    return res(ctx.json({ status: 'success' }))
  }),
  
 
]
export { handlers }
