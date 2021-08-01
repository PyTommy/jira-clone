import bcrypt from 'bcrypt'
import { RequestHandler } from 'express'
import { UserAttributes } from '@jira-clone/shared-types'
import { UserRepo } from '@jira-clone/apps/server/repositories'
import { StrUtils } from '../util/stringUtils'

export const registerUser: RequestHandler<
  {},
  { user: UserAttributes; accessToken: string },
  { name: string; email: string; password: string }
> = async (req, res) => {
  const { name, email, password } = req.body
  const alreadyRegisteredUser = await UserRepo.getByEmail(email)
  if (alreadyRegisteredUser) {
    throw new Error('already registered email.') // TODO あとでErrorHandlingしっかりする。
  }

  const hashedPassword = await StrUtils.hash(password)
  const newUserId = StrUtils.uuid()
  await UserRepo.create({
    name,
    email,
    password_hash: hashedPassword,
    id: newUserId,
  })

  const user = await UserRepo.getById(newUserId)
  if (!user) {
    throw new Error('something went wrong') // TODO あとでErrorHandlingしっかりする。
  }

  res.status(201).send({
    user,
    accessToken: 'sample',
  })
}
