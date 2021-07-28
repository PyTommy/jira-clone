import { Router } from 'express'
import { getTaskById } from '../controller/task.controllers'

const todoRouter = Router()

todoRouter.get('/:id', getTaskById)

export default todoRouter
