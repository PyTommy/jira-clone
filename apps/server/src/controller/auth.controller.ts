import { RequestHandler } from 'express'
import { UserAttributes } from '@jira-clone/shared-types'
import { UserRepo } from '@jira-clone/apps/server/repositories'
import { StrUtils } from '../util/stringUtils'
import { authUtils } from '../util/authUtils'
import {
  HTTPAlreadyExistsError,
  HTTPInternalServerError,
  HTTPNotFoundError,
  HTTPUnauthorizedError,
} from '../valueObject/httpError'

export const registerUser: RequestHandler<
  {},
  { user: UserAttributes },
  { name: string; email: string; password: string }
> = async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    const alreadyRegisteredUser = await UserRepo.getByEmail(email)
    if (alreadyRegisteredUser) {
      throw new HTTPAlreadyExistsError('already registered email.')
    }

    const hashedPassword = await authUtils.hash(password)
    const newUserId = StrUtils.uuid()
    await UserRepo.create({
      name,
      email,
      password_hash: hashedPassword,
      id: newUserId,
    })

    const user = await UserRepo.getById(newUserId)
    if (!user) {
      throw new HTTPInternalServerError(
        'Could not find user after registration.',
      )
    }

    const token = authUtils.createToken(user.id)
    res.setHeader('set-cookie', [authUtils.createCookie(token)])

    res.status(201).send({ user })
  } catch (e) {
    next(e)
  }
}

export const login: RequestHandler<
  {},
  { user: UserAttributes },
  { email: string; password: string }
> = async (req, res) => {
  const { email, password } = req.body
  const user = await UserRepo.getWithHashedPasswordByEmail(email)
  if (!user) {
    throw new HTTPNotFoundError('Not found user with the account.')
  }

  const isValidPassword = authUtils.isPasswordMaching(
    password,
    user.password_hash,
  )
  if (!isValidPassword) {
    throw new HTTPUnauthorizedError('password is wrong')
  }

  // set-token in cookie;
  const token = authUtils.createToken(user.id)
  res.setHeader('set-cookie', [authUtils.createCookie(token)])

  delete user.password_hash
  res.status(200).send({ user })
}
