import { server } from './server'
import '@testing-library/jest-dom/extend-expect'
beforeAll(() => server.listen())
// if you need to add a handler after calling setupServer for some specific test
// this will remove that handler for the rest of them
// (which is important for test isolation):
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
process.env.JWT_SECRET='your_very_secret_key'