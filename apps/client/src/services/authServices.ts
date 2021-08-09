import { axios } from '@client/utils/axios'
import { UserAttributes } from '@jira-clone/shared-types'

// Methods
type RegisterBody = { name: string; email: string; password: string }
type RegisterRes = Promise<UserAttributes>
type Register = (body: RegisterBody) => RegisterRes

type LoginBody = { email: string; password: string }
type LoginRes = Promise<UserAttributes>
type Login = (body: LoginBody) => LoginRes

type CookieLoginRes = Promise<UserAttributes>
type CookieLogin = () => CookieLoginRes

interface IAuthService {
  register: Register
  login: Login
  cookieLogin: CookieLogin
}

class AuthServiceImpl implements IAuthService {
  register: Register = async ({ name, email, password }) => {
    const response = await axios.post('/auth/register', { name, email, password })
    const { user } = response.data as { user: UserAttributes }
    return user
  }
  login: Login = async ({ email, password }) => {
    const response = await axios.post('/auth/login', { email, password })
    const { user } = response.data as { user: UserAttributes }
    return user
  }
  cookieLogin: CookieLogin = async () => {
    const response = await axios.get('/auth/cookie_login')
    const { user } = response.data as { user: UserAttributes }
    return user
  }
}

export const AuthService = new AuthServiceImpl()
