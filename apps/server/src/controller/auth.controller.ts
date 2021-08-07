import { RequestHandler } from 'express'
import { UserAttributes } from '@jira-clone/shared-types'
import { authUtils } from '../util/authUtils'
import { AuthService } from '../services/auth.service'

export const registerUser: RequestHandler<
  {},
  { user: UserAttributes },
  { name: string; email: string; password: string }
> = async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    const { token, user } = await AuthService.register({
      name,
      email,
      password,
    })

    res.setHeader('set-cookie', [authUtils.createCookie(token)])
    return res.status(201).send({ user })
  } catch (e) {
    next(e)
  }
}

export const login: RequestHandler<
  {},
  { user: UserAttributes },
  { email: string; password: string }
> = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const { user, token } = await AuthService.login({ email, password })

    res.setHeader('set-cookie', [authUtils.createCookie(token)])
    return res.status(200).send({ user })
  } catch (e) {
    next(e)
  }
}
