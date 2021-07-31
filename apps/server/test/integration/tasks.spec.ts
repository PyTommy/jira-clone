import request from 'supertest'

import app from '@jira-clone/apps/server/app'

describe('GET /api/task/:id', () => {
  it('should return a task', async () => {
    const id = 'thisisid'
    const response = await request(app).get('/api/task/' + id)

    expect(response.status).toBe(200)
    expect(response.body).toEqual({ id, title: 'this is title' })
  })
})
