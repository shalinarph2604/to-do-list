import { Request, Response } from 'express'
import { userSchema } from '../schemas/user-schema'
import userService from '../services/user-service'
import { createdJsonResponse } from '../helpers/response'
import BadRequestError from '../helpers/custom-errors/bad-request'

export const createUser = async (req: Request, res: Response) => {
  const user = await userSchema.parseAsync(req.body)

  const createdUser = await userService.createUser(user)

  createdJsonResponse(res, createdUser)
}

export const findUserById = async (req: Request, res: Response) => {
  const id = req.params.id

  if (!Number(id)) {
    throw new BadRequestError('id is not valid')
  }

  const user = await userService.findUserById(Number(id))

  createdJsonResponse(res, user)
}

export default {
  createUser,
  findUserById,
}
