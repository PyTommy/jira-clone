import express from 'express'
import { Router } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { errorMiddleware } from '../middlewares/error.middleware'

export default function initializeApp(router: Router) {
  const app = express()
  const isProduction = process.env.NODE_ENV === 'production'
  const origin = { origin: isProduction ? false : '*' }

  app.use(express.json())
  app.use(cors(origin))
  app.use(cookieParser())
  app.use(errorMiddleware)

  app.use('/api', router)

  return app
}
