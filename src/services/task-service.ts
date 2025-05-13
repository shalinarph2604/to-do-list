import taskRepository from '../repositories/task-repository'
import { QueryTaskSchema, TaskSchema, TaskSchemaPartial } from '../schemas/task-schema'
import NotFoundError from '../helpers/custom-errors/not-found'
import { FindAndCountOptions } from 'sequelize/types/model'
import { Task } from '../models/Task'

// menggabungkan schema dengan repository

type TaskSchemaWithUserId = TaskSchema & { userId: number } // menyertakan userId ke dalam TaskSchema

const createTask = async (task: TaskSchemaWithUserId) => {
  return taskRepository.createTask(task)
}

const findAllTasks = async (userId: number, query: QueryTaskSchema) => {
  const payload: Omit<FindAndCountOptions<Task>, 'group'> = {
    where: {
      userId,
    },
  }

  if (query.is_completed) {
    payload.where = {
      ...payload.where,
      completed: query.is_completed === 'true',
    }
  }

  return taskRepository.findAllTasks(payload)
}

const findTaskById = async (id: number, userId: number) => { // supaya task kita tidak bisa diakses oleh user lain
  const task = await taskRepository.findTaskByIdAndUserId(id, userId)
  if (!task) {
    throw new NotFoundError('Tidak ada tugas')
  }

  return task
}

const updateTaskById = async (id: number, userId: number, data: TaskSchemaPartial) => {
  const task = await taskRepository.findTaskByIdAndUserId(id, userId)
  if (!task) {
    throw new NotFoundError('Tidak ada tugas')
  }
  return taskRepository.updateTaskById(id, data)
}

const deleteTaskById = async (id: number, userId: number) => {
  const task = await taskRepository.findTaskByIdAndUserId(id, userId)
  if (!task) {
    throw new NotFoundError('Tidak ada tugas')
  }
  return taskRepository.deleteTaskById(id)
}

export default { createTask, findAllTasks, findTaskById, updateTaskById, deleteTaskById }
