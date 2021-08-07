import HttpStatusCode from '../../enums/httpStatusCode'
import { BaseError } from './baseError'

export class HTTPBadRequestError extends BaseError {
  constructor(description = 'bad request') {
    super('BAD REQUEST', HttpStatusCode.BAD_REQUEST, description, true)
  }
}

/**
 * Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet
 * been provided. The response must include a WWW-Authenticate header field containing a challenge applicable to the
 * requested resource. See Basic access authentication and Digest access authentication. 401 semantically means
 * "unauthenticated",i.e. the user does not have the necessary credentials.
 */
export class HTTPUnauthorizedError extends BaseError {
  constructor(description = 'unauthorized') {
    super('UNAUTHORIZED', HttpStatusCode.UNAUTHORIZED, description, true)
  }
}

/**
 * The request was valid, but the server is refusing action.
 * The user might not have the necessary permissions for a resource.
 */
export class HTTPForbiddenError extends BaseError {
  constructor(description = 'forbidden') {
    super('FORBIDDEN', HttpStatusCode.FORBIDDEN, description, true)
  }
}
/**
 * The requested resource could not be found but may be available in the future.
 * Subsequent requests by the client are permissible.
 */
export class HTTPNotFoundError extends BaseError {
  constructor(description = 'not found') {
    super('NOT FOUND', HttpStatusCode.NOT_FOUND, description, true)
  }
}
/**
 * A request method is not supported for the requested resource;
 * for example, a GET request on a form that requires data to be presented via POST, or a PUT request on a read-only resource.
 */
export class HTTPMethodNotAllowedError extends BaseError {
  constructor(description = 'bad request') {
    super(
      'Method Not Allowed',
      HttpStatusCode.METHOD_NOT_ALLOWED,
      description,
      true,
    )
  }
}

/**
 * The server timed out waiting for the request.
 * According to HTTP specifications:
 * "The client did not produce a request within the time that the server was prepared to wait. The client MAY repeat the request without modifications at any later time."
 */
export class HTTPTimeoutError extends BaseError {
  constructor(description = 'request timeout') {
    super('Request Timeout', HttpStatusCode.REQUEST_TIMEOUT, description, true)
  }
}
/**
 * Indicates that the request could not be processed because of conflict in the request,
 * such as an edit conflict between multiple simultaneous updates.
 */
export class HTTPConflictError extends BaseError {
  constructor(description = 'conflict') {
    super('CONFLICT', HttpStatusCode.CONFLICT, description, true)
  }
}
export class HTTPAlreadyExistsError extends BaseError {
  constructor(description = 'already exists') {
    super('Already Exists', HttpStatusCode.CONFLICT, description, true)
  }
}

/**
 * The request entity has a media type which the server or resource does not support.
 * For example, the client uploads an image as image/svg+xml, but the server requires that images use a different format.
 */
export class HTTPUnsupportedMediaTypeError extends BaseError {
  constructor(description = 'unsupported media type') {
    super(
      'UNSUPPORTED_MEDIA_TYPE',
      HttpStatusCode.UNSUPPORTED_MEDIA_TYPE,
      description,
      true,
    )
  }
}

/**
 * A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.
 */
export class HTTPInternalServerError extends BaseError {
  constructor(description = 'internal server error') {
    super(
      'INTERNAL SERVER ERROR',
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      description,
      false,
    )
  }
}
/**
 * The server either does not recognize the request method, or it lacks the ability to fulfill the request.
 * Usually this implies future availability (e.g., a new feature of a web-service API).
 */
export class HTTPNotImplementedError extends BaseError {
  constructor(description = 'not implemented') {
    super('NOT IMPLEMENTED', HttpStatusCode.NOT_IMPLEMENTED, description, true)
  }
}
