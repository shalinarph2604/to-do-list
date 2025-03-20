import BadRequestError from '../helpers/custom-errors/bad-request'
import Unauthorized from '../helpers/custom-errors/unauthorized'
import jwtHelper from '../helpers/jwt'
import passwordHelper from '../helpers/password'
import userRepository from '../repositories/user-repository'

export const login = async ({
  email,
  password,
}) => {
  const user = await userRepository.findUserPasswordByEmail(email)
  if (!user) {
    throw new BadRequestError('email or password is incorrect')
  }

  const isPasswordValid = await passwordHelper.verifyPassword(password, user.password)

  if (!isPasswordValid) {
    throw new BadRequestError('email or password is incorrect')
  }

  const jwt = jwtHelper.generateToken({
    uid: user.id,
  }, '1d')

  return jwt
}

export const getUserAndPrivilege = async (id: number) => {
  const user = await userRepository.findUserById(id)

  if (!user) {
    throw new Unauthorized('Not Authorized')
  }

  return user
}

export default {
  login,
  getUserAndPrivilege,
}
