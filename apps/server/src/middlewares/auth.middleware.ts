import { UserAttributes } from '@jira-clone/shared-types'
import { NextFunction, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { environment } from '../environments/environment'
import { UserRepo } from '../repositories'
import { authUtils } from '../util/authUtils'

interface RequestWithUser extends Request {
  user: UserAttributes
}

async function authMiddleware(
  request: RequestWithUser,
  response: Response,
  next: NextFunction,
) {
  const cookies = (request as any).cookies as unknown
  if (authUtils.isValidCookie(cookies)) {
    const secret = environment.jwt_secret
    const verificationResponse = jwt.verify(
      cookies.Authorization,
      secret,
    ) as any
    if (authUtils.isValidDataStoredInToken(verificationResponse)) {
      const userId = verificationResponse._id
      try {
        const user = await UserRepo.getById(userId)
        if (user) {
          request.user = user
          next()
        } else {
          next('Authorization fail')
        }
      } catch (error) {
        next('Authorization fail')
      }
    }
  } else {
    next('not valid cookie')
  }
}

export default authMiddleware
