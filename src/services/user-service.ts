import userRepository from '../repositories/user-repository'
import passwordHelper from '../helpers/password'
import { UserSchema, UserSchemaPartial } from '../schemas/user-schema'

const createUser = async (user: UserSchema) => {
  user.password = await passwordHelper.hashPassword(user.password)
  return userRepository.createUser(user)
}

const findUserById = async (id: number) => {
  return userRepository.findUserById(id)
}

const findUserByEmail = async (email: string) => {
  return userRepository.findUserByEmail(email)
}

const findUserPasswordByEmail = async (email: string) => {
  return userRepository.findUserPasswordByEmail(email)
}

const updateUserById = async (id: number, data: UserSchemaPartial) => {
  if (data.password) data.password = await passwordHelper.hashPassword(data.password)
  return userRepository.updateUserById(id, data)
}

const deleteUserById = async (id: number) => {
  return userRepository.deleteUserById(id)
}

export default {
  createUser,
  findUserById,
  findUserByEmail,
  findUserPasswordByEmail,
  updateUserById,
  deleteUserById,
}
