import { Router } from 'express'

import taskRoutes from './task.router'

const router = Router()

router.use('/task', taskRoutes)

export default router
