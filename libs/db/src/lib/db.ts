import { Sequelize } from 'sequelize-typescript'
import { User } from './models'

const db = new Sequelize({
  database: 'trello',
  dialect: 'mysql',
  username: 'root',
  password: 'testtest',
  models: [User],
})

db.addModels([User])

export const connectDB = async () => {
  try {
    await db.sync()
    console.log('connected to mysql!!')
  } catch (e) {
    throw e
  }
}

export default db
