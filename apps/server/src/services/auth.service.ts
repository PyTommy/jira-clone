import { UserRepo } from '@jira-clone/apps/server/repositories'
import { UserAttributes } from '@jira-clone/shared-types'
import { authUtils, TokenData, ValidCookie } from '../util/authUtils'
import { StrUtils } from '../util/stringUtils'
import {
  HTTPAlreadyExistsError,
  HTTPInternalServerError,
  HTTPNotFoundError,
  HTTPUnauthorizedError,
} from '@jira-clone/apps/server/error'
import { UserAttributesWithHashedPassword } from '@jira-clone/db-interfaces'

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

// cookieLogin
type CookieLoginParams = { cookies: ValidCookie }
type CookieLoginReturnValue = Promise<{ user: UserAttributes }>
type CookieLogin = (data: CookieLoginParams) => CookieLoginReturnValue

// ============
// Service Class Interface
// ============
interface IAuthService {
  register: Register
  login: Login
  cookieLogin: CookieLogin
}

// ============
// Service Class Implementation
// ============
class AuthServiceImpl implements IAuthService {
  // ==============
  // Public
  // ==============
  public register: Register = async ({ name, email, password }) => {
    await this.validateUserNotExist(email)
    const user = await this.createUser({ name, email, password })
    const token = authUtils.createToken(user.id)
    return { user, token }
  }

  public login: Login = async ({ email, password }) => {
    const { user, password_hash } = await this.getUserDataWithHashedPassword(email)
    this.validatePassword(password, password_hash)
    const token = authUtils.createToken(user.id)
    return { user, token }
  }

  public cookieLogin: CookieLogin = async ({ cookies }) => {
    const userId = this.extractUserIdFromCookie(cookies)
    const user = await this.getUserById(userId)
    return { user }
  }

  // ==============
  // Private
  // ==============
  private validateUserNotExist = async (email: string) => {
    const alreadyRegisteredUser = await UserRepo.getByEmail(email)
    if (alreadyRegisteredUser) {
      throw new HTTPAlreadyExistsError('already registered email.')
    }
  }
  private createUser = async ({ name, email, password }): Promise<UserAttributes> => {
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
      throw new HTTPInternalServerError('Could not find user after registration.')
    }
    return user
  }

  private getUserDataWithHashedPassword = async (
    email: string,
  ): Promise<{ user: UserAttributes; password_hash: string }> => {
    const user = await UserRepo.getWithHashedPasswordByEmail(email)
    if (!user) throw new HTTPNotFoundError('Not found user with the account.')
    const { password_hash, ...otherUserProps } = user
    return { user: otherUserProps, password_hash }
  }
  private validatePassword = (password: string, password_hash: string) => {
    const isValidPassword = authUtils.isPasswordMaching(password, password_hash)
    if (!isValidPassword) {
      throw new HTTPUnauthorizedError('password is wrong')
    }
  }
  private extractUserIdFromCookie = (cookie: ValidCookie): string => {
    const result = authUtils.getUserIdByCookie(cookie)
    if (!result) throw new HTTPUnauthorizedError('invalid cookie')
    return result.userId
  }

  private getUserById = async (userId: string): Promise<UserAttributes> => {
    const user = await UserRepo.getById(userId)
    if (!user) throw new HTTPNotFoundError('user now found')
    return user
  }
}

export const AuthService = new AuthServiceImpl()
