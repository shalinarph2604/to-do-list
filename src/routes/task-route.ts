import express from 'express'
import taskController from '../controllers/task-controller'
import { authMiddleware } from '../middlewares/auth-middleware'

const taskRoutes = express.Router()

taskRoutes.post('/tasks', express.json(), authMiddleware, taskController.createTask)
taskRoutes.get('/tasks', authMiddleware, taskController.findAllTasks)
taskRoutes.delete('/tasks/:id', express.json(), authMiddleware, taskController.deleteTaskById)
taskRoutes.put('/tasks/:id', express.json(), authMiddleware, taskController.updateTaskById)

export default taskRoutes
