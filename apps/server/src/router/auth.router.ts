import { Router } from 'express'
import { registerUser, login, cookieLogin } from '../controller/auth.controller'

const authRouter = Router()

authRouter.post('/register', registerUser)
authRouter.post('/login', login)
authRouter.get('/cookie_login', cookieLogin)

export default authRouter
