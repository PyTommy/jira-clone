import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Router } from 'express'
import { errorMiddleware } from '../middlewares/error.middleware'

export default function initializeApp(router: Router) {
  const app = express()
  const isProduction = process.env.NODE_ENV === 'production'
  const origin = {
    origin: 'http://localhost:4200',
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
  }

  app.use(express.json())
  app.use(cors(origin))
  app.use(cookieParser())

  app.use('/api', router)
  app.use(errorMiddleware)

  return app
}
