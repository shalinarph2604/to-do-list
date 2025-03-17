import { FindOptions, Op } from 'sequelize'
import UserModel, { User } from '../models/User'

interface FindAllUserWhere {
  name?: string
}

interface FindAllUserOptions {
  limit?: number
  page?: number
}

const createUser = async (user: User): Promise<User> => {
  return UserModel.create(user).then(res => res.toJSON())
}

const findUserById = async (id: number): Promise<Omit<User, 'password'> | undefined> => {
  return UserModel.findByPk(id).then(res => res?.toJSON())
}

const findUserByEmail = async (email: string): Promise<Omit<User, 'password'> | undefined> => {
  return UserModel.findOne({
    where: {
      email,
    },
  }).then(res => res?.toJSON())
}

const findUserPasswordByEmail = async (email: string): Promise<Pick<User, 'password'> | undefined> => {
  return UserModel.scope('allAttributes').findOne({
    where: {
      email,
    },
    attributes: ['password'], // hanya dapatkan kolom password
  }).then(res => res?.toJSON())
}

const updateUserById = async (id: number, data: Partial<User>) => {
  return UserModel.update(data, {
    where: {
      id,
    },
  })
}

const deleteUserById = async (id: number) => {
  return UserModel.destroy({
    where: {
      id,
    },
  })
}

const findAllUser = async (where: FindAllUserWhere = {}, opts: FindAllUserOptions = {}) => {
  const payload: FindOptions<User> = {}
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

  return UserModel.findAll(payload)
}

const findAndCountAllUser = async (where: FindAllUserWhere = {}, opts: FindAllUserOptions = {}) => {
  const payload: FindOptions<User> = {}
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

  return UserModel.findAndCountAll(payload)
}

export default {
  createUser,
  findUserById,
  findUserByEmail,
  findUserPasswordByEmail,
  updateUserById,
  deleteUserById,
  findAllUser,
  findAndCountAllUser,
}
