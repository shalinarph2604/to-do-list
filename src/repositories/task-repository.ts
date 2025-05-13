import { FindOptions, Optional } from 'sequelize'
import { NullishPropertiesOf } from 'sequelize/types/utils'
import TaskModel, { Task } from '../models/Task'

const createTask = async (task: Optional<Task, NullishPropertiesOf<Task>> | undefined): Promise<Task> => {
  return TaskModel.create(task).then(res => res.toJSON())
}

const findAllTasks = async (payload: FindOptions<Task> | undefined) => {
  return TaskModel.findAll(payload)
}

const findTaskByIdAndUserId = async (id: number, userId: number) => {
  return TaskModel.findOne({
    where: {
      id,
      userId,
    },
  })
}

const updateTaskById = async (id: number, data: Partial<Task>) => {
  return TaskModel.update(data, {
    where: {
      id,
    },
  })
}

const deleteTaskById = async (id: number) => {
  return TaskModel.destroy({
    where: {
      id,
    },
  })
}

export default {
  createTask,
  findAllTasks,
  findTaskByIdAndUserId,
  updateTaskById,
  deleteTaskById,
}
