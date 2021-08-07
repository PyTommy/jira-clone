import { errorHandler } from '@jira-clone/apps/server/util/errorHandler'
import { BaseError } from '@jira-clone/apps/server/valueObject/httpError/baseError'
import { Request, Response, NextFunction } from 'express'

export const errorMiddleware = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!errorHandler.isTrustedError(err)) {
    if (err instanceof BaseError) {
      res
        .status(err.httpCode)
        .send({ statusText: err.name, message: err.message })
    } else {
      res.status(500).send(err)
    }
  }
  await errorHandler.handleError(err)
}
