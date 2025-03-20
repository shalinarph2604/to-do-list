import userRepository from '../repositories/user-repository'
import passwordHelper from '../helpers/password'
import { UserSchema, UserSchemaPartial, QueryUserSchema } from '../schemas/user-schema'
import NotFoundError from '../helpers/custom-errors/not-found'
import BadRequestError from '../helpers/custom-errors/bad-request'
import { FindAndCountOptions } from 'sequelize/types/model'
import { User } from '../models/User'
import { Op } from 'sequelize'

const createUser = async (user: UserSchema) => {
  const isEmailExist = await findUserByEmail(user.email)

  if (isEmailExist) {
    throw new BadRequestError('Email is already used!')
  }

  // ubah plain text password menjadi hashed password
  user.password = await passwordHelper.hashPassword(user.password)

  const createdUser = await userRepository.createUser(user)

  // jadikan password undefined agar user tidak bisa melihat password
  return Object.assign(createdUser, { password: undefined })
}

const findUserById = async (id: number) => {
  const user = await userRepository.findUserById(id)

  if (!user) {
    throw new NotFoundError('User not found!')
  }

  return user
}

const findUserByEmail = async (email: string) => {
  return userRepository.findUserByEmail(email)
}

const findUserPasswordByEmail = async (email: string) => {
  return userRepository.findUserPasswordByEmail(email)
}

const updateUserById = async (id: number, data: UserSchemaPartial) => {
  // cek dan validasi user
  await findUserById(id)

  // ubah plain text password menjadi hashed password
  if (data.password) data.password = await passwordHelper.hashPassword(data.password)

  return userRepository.updateUserById(id, data)
}

const deleteUserById = async (id: number) => {
  // cek dan validasi user
  await findUserById(id)
  return userRepository.deleteUserById(id)
}

const findAndCountAllUser = async (query: QueryUserSchema) => {
  const payload: Omit<FindAndCountOptions<User>, 'group'> = {}

  if (query.name) {
    payload.where = {
      name: {
        [Op.iLike]: `%${query.name}%`,
      },
    }
  }

  payload.order = [[query.order_by, query.order_direction]]

  payload.limit = query.limit

  payload.offset = (query.page - 1) * query.limit

  return userRepository.findAndCountAllUser(payload)
}

export default {
  createUser,
  findUserById,
  findUserByEmail,
  findUserPasswordByEmail,
  updateUserById,
  deleteUserById,
  findAndCountAllUser,
}
