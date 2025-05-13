import { Request, Response } from 'express'
import { taskSchema, queryTaskSchema, taskSchemaPartial } from '../schemas/task-schema'
import taskService from '../services/task-service'
import { createdResponse, successResponse } from '../helpers/response'
import { numberIdSchema } from '../schemas/id-schema'

// memparsing input dan mengembalikan hasilnya kepada client

export const createTask = async (req: Request, res: Response) => {
  const user = req.USER

  if (!user || !user.id) {
    console.log('Unauthorized user')
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  console.log('REQUEST BODY:', req.body)

  try {
    const parsedPayload = await taskSchema.parseAsync(req.body)

    const payload = {
      ...parsedPayload,
      userId: user.id,
    }

    console.log('Received task data:', payload)

    const task = await taskService.createTask(payload)

    createdResponse(res, task)
  } catch (err) {
    return res.status(400).json({
      message: 'Invalid task input',
      error: err,
    })
  }
}

export const findAllTasks = async (req: Request, res: Response) => {
  const user = req.USER

  if (!user || !user.id) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  console.log('Query received:', req.query)

  const query = await queryTaskSchema.parseAsync({ is_completed: req.query.is_completed ?? '' })

  const tasks = await taskService.findAllTasks(user.id, query)

  successResponse(res, tasks)
}

export const updateTaskById = async (req: Request, res: Response) => {
  const user = req.USER

  if (!user || !user.id) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  const id = await numberIdSchema.parseAsync(req.params.id)

  const data = await taskSchemaPartial.parseAsync(req.body)

  await taskService.updateTaskById(id, user.id, data)

  const updatedTask = await taskService.findTaskById(id, user.id)

  successResponse(res, updatedTask)
}

export const deleteTaskById = async (req: Request, res: Response) => {
  const user = req.USER

  if (!user || !user.id) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  const id = await numberIdSchema.parseAsync(req.params.id)

  await taskService.deleteTaskById(id, user.id)

  successResponse(res, {})
}

export default { createTask, findAllTasks, updateTaskById, deleteTaskById }
