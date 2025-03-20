import { FindOptions, FindAndCountOptions, Optional } from 'sequelize'
import UserModel, { User } from '../models/User'
import { NullishPropertiesOf } from 'sequelize/types/utils'
import { UserPrivilegeModel } from '../models'

const createUser = async (user: Optional<User, NullishPropertiesOf<User>> | undefined): Promise<User> => {
  return UserModel.create(user).then(res => res.toJSON())
}

const findUserById = async (id: number): Promise<Omit<User, 'password'> | undefined> => {
  return UserModel.findByPk(id, {
    include: {
      model: UserPrivilegeModel,
      as: 'privilege',
    },
  }).then(res => res?.toJSON())
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

const findAllUser = async (payload: FindOptions<User> | undefined) => {
  return UserModel.findAll(payload)
}

const findAndCountAllUser = async (payload: Omit<FindAndCountOptions<User>, 'group'>) => {
  payload.include = {
    model: UserPrivilegeModel,
    as: 'privilege',
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
