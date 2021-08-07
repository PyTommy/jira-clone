import { UserRepo } from '@jira-clone/apps/server/repositories'
import { UserAttributes } from '@jira-clone/shared-types'
import { authUtils, TokenData } from '../util/authUtils'
import { StrUtils } from '../util/stringUtils'
import {
  HTTPAlreadyExistsError,
  HTTPInternalServerError,
} from '../valueObject/httpError'

interface IAuthService {
  register({
    name,
    email,
    password,
  }): Promise<{ token: TokenData; user: UserAttributes }>
}

class AuthServiceImpl implements IAuthService {
  public async register({
    name,
    email,
    password,
  }: {
    name: any
    email: any
    password: any
  }): Promise<{ token: TokenData; user: UserAttributes }> {
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

    return { user, token }
  }
}

export const AuthService = new AuthServiceImpl()
