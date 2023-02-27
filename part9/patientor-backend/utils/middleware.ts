import { Response, Request } from 'express'

export const unknownEndpoint = (_req: Request, res: Response) => {
  return res.status(404).send({ error: 'unknown endpoint' })
}
