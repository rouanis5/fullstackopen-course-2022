import { PORT } from './utils/config'
import app from './app'
import http from 'http'

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`)
})
