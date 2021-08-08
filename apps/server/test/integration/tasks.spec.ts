import request from 'supertest'

import app from '@jira-clone/apps/server/app'
import { DB } from '@jira-clone/db'
import { StrUtils } from '@jira-clone/apps/server/util/stringUtils'
import { environment } from '@jira-clone/apps/server/environments/environment'
import { authUtils } from '@jira-clone/apps/server/util/authUtils'

beforeAll(async () => {
  const db = new DB({
    host: environment.dbHost,
    port: Number(environment.dbPort),
    database: environment.dbDatabase,
    username: environment.dbUsername,
    password: environment.dbPassword,
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
  it('should success with appropriate response.', async () => {
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
    expect(
      authUtils.getCookieValue(response.header['set-cookie'][0], 'Authorization').length > 0,
    ).toBeTruthy()
    expect(
      authUtils.getCookieValue(response.header['set-cookie'][0], 'Max-Age').length > 0,
    ).toBeTruthy()
  })
  it('should fail with already exsit error(409)', async () => {
    const uuid = StrUtils.uuid()
    const user1 = {
      name: 'new_user2',
      email: 'new_user' + uuid + '@example.com',
      password: 'demodemo',
    }
    await request(app).post('/api/auth/register').send(user1)

    const response = await request(app).post('/api/auth/register').send(user1)
    expect(response.status).toBe(409)
  })
})

describe('POST /api/auth/login', () => {
  let user: any = undefined
  beforeAll(async () => {
    const uuid = StrUtils.uuid()
    user = {
      name: 'new_user1',
      email: 'new_user' + uuid + '@example.com',
      password: 'demodemo',
    }
    await request(app).post('/api/auth/register').send(user)
  })
  it('should login successfully', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: user.email,
      password: user.password,
    })

    expect(response.status).toBe(200)
    expect(response.body.user.name).toBe(user.name)
    expect(response.body.user.email).toBe(user.email)
    expect(response.body.user.password_hash).toBeUndefined()
    expect(
      authUtils.getCookieValue(response.header['set-cookie'][0], 'Authorization').length > 0,
    ).toBeTruthy()
    expect(
      authUtils.getCookieValue(response.header['set-cookie'][0], 'Max-Age').length > 0,
    ).toBeTruthy()
  })
})

describe('POST /api/auth/cookie_login', () => {
  let user = undefined
  let cookies = ''
  beforeAll(async () => {
    const uuid = StrUtils.uuid()
    user = {
      name: 'cookie_user',
      email: 'cookie_user' + uuid + '@example.com',
      password: 'demodemo',
    }
    const response = await request(app).post('/api/auth/register').send(user)
    cookies = response.header['set-cookie'][0]
  })
  it('should login with cookie', async () => {
    const response = await request(app).get('/api/auth/cookie_login').set('Cookie', cookies).send()

    expect(response.status).toBe(200)
    expect(response.body.user.name).toBe(user.name)
    expect(response.body.user.email).toBe(user.email)
    expect(response.body.user.password_hash).toBeUndefined()
  })
})
