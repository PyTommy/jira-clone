import { UserAttributes } from '@jira-clone/shared-types'
import { NextFunction, Response } from 'express'
import { HTTPUnauthorizedError } from '../error'
import { AuthService } from '../services/auth.service'
import { authUtils } from '../util/authUtils'

interface RequestWithUser extends Request {
  user: UserAttributes
}

async function authMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
  try {
    const cookies = (request as any).cookies as unknown
    if (!authUtils.isValidCookieType(cookies)) {
      throw new HTTPUnauthorizedError('invalid cookie')
    }
    const { user } = await AuthService.cookieLogin({ cookies: cookies })
    request.user = user
  } catch (e) {
    next(e)
  }
}

export default authMiddleware
