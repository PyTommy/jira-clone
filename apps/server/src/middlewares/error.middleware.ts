import { errorHandler } from '@jira-clone/apps/server/util/errorHandler'
import { BaseError } from '@jira-clone/apps/server/valueObject/httpError/baseError'
import { Request, Response, NextFunction } from 'express'

export const errorMiddleware = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (errorHandler.isTrustedError(err)) {
    res
      .status((err as BaseError).httpCode)
      .send({ statusText: err.name, message: err.message })
  } else {
    await errorHandler.handleError(err)
    return res
      .send(500)
      .send({ statusText: 'internal server error', message: err.message })
  }
}
