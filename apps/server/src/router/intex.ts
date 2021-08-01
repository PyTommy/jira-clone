import { Router } from 'express'

import authRouter from './auth.router'
import taskRoutes from './task.router'

const router = Router()

router.use('/task', taskRoutes)
router.use('/auth', authRouter)

export default router
