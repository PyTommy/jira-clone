import { UserRepo } from '@jira-clone/apps/server/repositories'
import { UserAttributes } from '@jira-clone/shared-types'
import { authUtils, TokenData } from '../util/authUtils'
import { StrUtils } from '../util/stringUtils'
import {
  HTTPAlreadyExistsError,
  HTTPInternalServerError,
  HTTPNotFoundError,
  HTTPUnauthorizedError,
} from '@jira-clone/apps/server/error'

// ============
// Type Definitions
// ============
// Register
type RegisterParams = {
  name: string
  email: string
  password: string
}
type RegisterReturnValue = Promise<{ token: TokenData; user: UserAttributes }>
type Register = (data: RegisterParams) => RegisterReturnValue

// Login
type LoginParams = {
  email: string
  password: string
}
type LoginReturnValue = Promise<{ user: UserAttributes; token: TokenData }>
type Login = (data: LoginParams) => LoginReturnValue

// ============
// Service Class Interface
// ============
interface IAuthService {
  register: Register
  login: Login
}

// ============
// Service Class Implementation
// ============
class AuthServiceImpl implements IAuthService {
  public register: Register = async ({ name, email, password }) => {
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
  public login: Login = async ({ email, password }) => {
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

    const token = authUtils.createToken(user.id)

    delete user.password_hash
    return { user, token }
  }
}

export const AuthService = new AuthServiceImpl()
