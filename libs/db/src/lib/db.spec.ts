require('mysql2/node_modules/iconv-lite').encodingExists('foo')
import { connectDB } from './db'
import { MysqlUserModel } from './models'
import { v4 as uuidv4 } from 'uuid'
import { UserRepo } from './repositories'

beforeAll(async () => {
  await connectDB()
})

describe('User', () => {
  beforeEach(async () => {
    await MysqlUserModel.destroy({ where: {}, force: true }) // delete all data from table.
  })

  describe('UserRepo', () => {
    it('should create a user', async () => {
      const id = uuidv4()
      const email = `trello+${id}@example.com`
      const name = 'create'
      const password_hash = id

      const userRepo = new UserRepo()
      await userRepo.create({
        id,
        name,
        email,
        password_hash,
      })

      const user = await userRepo.getById(id)
      expect(user.id).toBe(id)
      expect(user.email).toBe(email)
      expect(user.name).toBe(name)
      expect(user.password_hash).toBe(password_hash) // FIXME remove it later
    })

    it('should throw user already exist error', () => {
      // TODO
    })
  })
})
