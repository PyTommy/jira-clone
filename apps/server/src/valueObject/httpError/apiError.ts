import HttpStatusCode from '../../enums/httpStatusCode'
import { BaseError } from './baseError'

export class APIError extends BaseError {
  constructor(
    name,
    httpCode = HttpStatusCode.INTERNAL_SERVER_ERROR,
    description = 'internal server error',
    isOperational = true,
  ) {
    super(name, httpCode, description, isOperational)
  }
}
