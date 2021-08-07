import { Router } from 'express'
import { registerUser, login } from '../controller/auth.controller'

const authRouter = Router()

authRouter.post('/register', registerUser)
authRouter.post('/login', login)

export default authRouter
