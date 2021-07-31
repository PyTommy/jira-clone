require('mysql2/node_modules/iconv-lite').encodingExists('foo')
import { connectDB } from './db'
import { User } from './models'
import { v4 as uuidv4 } from 'uuid'

beforeAll(async () => {
  await connectDB()
})

describe('User', () => {
  beforeEach(async () => {
    // await User.truncate({ force: true }) // drops table and re-creates it
    await User.destroy({ where: {}, force: true }) // delete all data from table.
  })
  it('should add a user', async () => {
    const id = uuidv4()
    const user = new User({
      id: id,
      name: 'tommy',
      email: `trello+${id}@example.com`,
      password_hash: id,
    })
    await user.save()

    const users = await User.findAll({ where: { id } })
    expect(users.length).toBe(1)
  })
})
