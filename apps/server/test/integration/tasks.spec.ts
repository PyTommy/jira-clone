import request from 'supertest'

import app from '@jira-clone/apps/server/app'
import { DB } from '@jira-clone/db'
import { StrUtils } from '@jira-clone/apps/server/util/stringUtils'

beforeAll(async () => {
  const db = new DB({
    host: 'localhost',
    port: 3306,
    database: 'trello',
    username: 'root',
    password: 'testtest',
  })
  await db.connectDB()
})

describe('GET /api/task/:id', () => {
  it('should return a task', async () => {
    const id = 'thisisid'
    const response = await request(app).get('/api/task/' + id)

    expect(response.status).toBe(200)
    expect(response.body).toEqual({ id, title: 'this is title' })
  })
})

describe('POST /api/auth/register', () => {
  it('', async () => {
    const uuid = StrUtils.uuid()
    const user1 = {
      name: 'new_user1',
      email: 'new_user' + uuid + '@example.com',
      password: 'demodemo',
    }

    const response = await request(app).post('/api/auth/register').send(user1)

    expect(response.status).toBe(201)
    expect(response.body.user.name).toBe(user1.name)
    expect(response.body.user.email).toBe(user1.email)
    expect(response.body.user.password_hash).toBeUndefined()
    expect(typeof response.body.accessToken).toBe('string')
  })
})
