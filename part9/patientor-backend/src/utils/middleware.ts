import { Response, Request, NextFunction } from 'express'
import { ZodError } from 'zod'

export const unknownEndpoint = (_req: Request, res: Response) => {
  return res.status(404).send({ error: 'unknown endpoint' })
}

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error.message)
  if (error instanceof ZodError) {
    return res.status(400).json({ error: error.issues })
  }
  next(error)
  return
}
