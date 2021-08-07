require('mysql2/node_modules/iconv-lite').encodingExists('foo')
import { DB, UserRepo } from '@jira-clone/db'
import { MysqlUserModel } from '../../lib/models'
import { v4 as uuidv4 } from 'uuid'
import { enviroments } from '../test_enviroments'

const userRepo = new UserRepo()

beforeAll(async () => {
  const db = new DB({
    host: enviroments.host,
    port: Number(enviroments.port),
    database: enviroments.database,
    username: enviroments.username,
    password: enviroments.password,
  })
  await db.connectDB()
})

const user1 = {
  id: '1',
  name: 'user1',
  email: 'user1@example.com',
  password_hash: 'passwordUser1',
}

describe('User', () => {
  beforeEach(async () => {
    await MysqlUserModel.destroy({ where: {}, force: true })
    await MysqlUserModel.create(user1)
  })

  describe('UserRepo', () => {
    describe('create', () => {
      it('should create a user', async () => {
        const id = uuidv4()
        const email = `trello+${id}@example.com`
        const name = 'create'
        const password_hash = id

        await userRepo.create({
          id,
          name,
          email,
          password_hash,
        })

        const user = await userRepo.getById(id)
        if (user) {
          expect(user.id).toBe(id)
          expect(user.email).toBe(email)
          expect(user.name).toBe(name)
        } else {
          throw new Error('user not exists')
        }
      })

      it('should throw user already exist error', () => {
        // TODO
      })
    })
  })

  describe('getByEmail', () => {
    it('should get a user', async () => {
      const user = await userRepo.getByEmail(user1.email)
      if (user) {
        expect(user.id).toBe(user1.id)
      } else {
        throw new Error('no user found')
      }
    })

    it('should not get any user', async () => {
      const user = await userRepo.getByEmail('random@example.com')

      expect(user).toBeUndefined()
    })
  })

  describe('getWithHashedPasswordByEmail', () => {
    it('should get a user', async () => {
      const user = await userRepo.getWithHashedPasswordByEmail(user1.email)
      if (user) {
        expect(user.password_hash).toBe(user1.password_hash)
      } else {
        throw new Error('no user found')
      }
    })
  })
})
