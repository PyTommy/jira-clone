import { RequestHandler } from 'express'
import { Task } from '@jira-clone/shared-types'

export const getTaskById: RequestHandler<{ id: string }, Task> = (req, res) => {
  res.send({
    id: req.params.id,
    title: 'this is title',
  })
}
