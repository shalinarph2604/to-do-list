import { Request, Response } from 'express'
import { queryUserSchema, userSchema, userSchemaPartial } from '../schemas/user-schema'
import userService from '../services/user-service'
import { createdResponse, paginationResponse, successResponse } from '../helpers/response'
import { numberIdSchema } from '../schemas/id-schema'

export const createUser = async (req: Request, res: Response) => {
  const user = await userSchema.parseAsync(req.body)

  const createdUser = await userService.createUser(user)

  createdResponse(res, createdUser)
}

export const findUserById = async (req: Request, res: Response) => {
  const id = await numberIdSchema.parseAsync(req.params.id)

  const user = await userService.findUserById(id)

  successResponse(res, user)
}

export const updateUserById = async (req: Request, res: Response) => {
  const id = await numberIdSchema.parseAsync(req.params.id)

  const data = await userSchemaPartial.parseAsync(req.body)

  const updatedUser = await userService.updateUserById(id, data)

  successResponse(res, updatedUser)
}

export const deleteUserById = async (req: Request, res: Response) => {
  const id = await numberIdSchema.parseAsync(req.params.id)

  await userService.deleteUserById(id)

  successResponse(res, {})
}

export const findAndCountAllUsers = async (req: Request, res: Response) => {
  const queryParams = await queryUserSchema.parseAsync(req.query)

  const result = await userService.findAndCountAllUser(queryParams)

  paginationResponse(res, result.rows, result.count, queryParams.page, queryParams.limit)
}

export default {
  createUser,
  findUserById,
  updateUserById,
  deleteUserById,
  findAndCountAllUsers,
}
