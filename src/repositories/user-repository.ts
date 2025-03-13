import { FindOptions, Op } from 'sequelize'
import User, { UserAttributes } from '../models/User'

const createUser = async (user: UserAttributes) => {
  return User.create(user)
}

const getUserById = async (id: number) => {
  return User.findByPk(id)
}

interface FindAllUserWhere {
  name?: string
}

interface FindAllUserOptions {
  limit?: number
  page?: number
}

const getAllUser = async (where: FindAllUserWhere = {}, opts: FindAllUserOptions = {}) => {
  const payload: FindOptions<UserAttributes> = {}
  if (where.name) {
    payload.where = {
      name: {
        [Op.iLike]: `%${where.name}%`,
      },
    }
  }

  if (opts.limit && opts.page) {
    payload.limit = opts.limit
    payload.offset = (opts.page - 1) * opts.limit + 1
  }

  return User.findAll(payload)
}

export {
  createUser,
  getAllUser,
  getUserById,
}
