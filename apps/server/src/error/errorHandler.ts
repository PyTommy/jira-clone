import { BaseError } from './baseError'

class ErrorHandler {
  public async handleError(err: Error): Promise<void> {
    console.error(
      'Error message from the centralized error-handling component',
      err,
    )
    // Do Something If You Want
  }

  public isTrustedError(error: Error) {
    if (error instanceof BaseError) {
      return error.isOperational
    }
    return false
  }
}
export const errorHandler = new ErrorHandler()
