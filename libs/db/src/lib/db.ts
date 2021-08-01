import { IDB } from '@jira-clone/db-interfaces'
import { Sequelize } from 'sequelize-typescript'
import { MysqlUserModel } from './models'

export class DB implements IDB {
  private host: string
  private port: number
  private database: string
  private dialect: 'mysql' = 'mysql'
  private username: string
  private password: string
  private db: Sequelize | null

  constructor({
    port,
    host,
    database,
    username,
    password,
  }: {
    host: string
    port: number
    database: string
    username: string
    password: string
  }) {
    this.host = host
    this.port = port
    this.database = database
    this.username = username
    this.password = password
  }

  async connectDB() {
    this.db = new Sequelize({
      database: this.database,
      dialect: this.dialect,
      username: this.username,
      password: this.password,
      host: this.host,
      port: this.port,
      models: [MysqlUserModel],
    })
    this.db.addModels([MysqlUserModel])

    try {
      await this.db.sync()
      console.log('connected to mysql!!')
    } catch (e) {
      throw e
    }
  }

  disconnectDB() {
    return this.db.close()
  }
}
