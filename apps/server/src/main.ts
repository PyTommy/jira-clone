import { DB } from '@jira-clone/db'
import app from './app'
import { environment } from './environments/environment'
import { errorHandler } from './error'

const db = new DB({
  host: environment.dbHost,
  port: Number(environment.dbPort),
  database: environment.dbDatabase,
  username: environment.dbUsername,
  password: environment.dbPassword,
})
db.connectDB().then(() => {
  const { port } = environment
  const server = app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/api')
  })
  server.on('error', console.error)

  // get the unhandled rejection and throw it to another fallback handler we already have.
  process.on('unhandledRejection', (reason: Error, promise: Promise<any>) => {
    // throw reason
  })

  process.on('uncaughtException', (error: Error) => {
    errorHandler.handleError(error)
    if (!errorHandler.isTrustedError(error)) {
      // process.exit(1)
    }
  })
})
