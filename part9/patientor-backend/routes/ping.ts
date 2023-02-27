import { Router } from 'express'

const pingRoute = Router()

pingRoute.get('/', (_req, res) => {
  res.send('pong')
})

export default pingRoute
