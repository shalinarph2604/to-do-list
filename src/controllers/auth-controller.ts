import { Request, Response } from 'express'
import { successResponse } from '../helpers/response'
import { userLoginSchema } from '../schemas/auth-schema'
import authService from '../services/auth-service'

export const loginUser = async (req: Request, res: Response) => {
  const payload = await userLoginSchema.parseAsync(req.body)

  const jwt = await authService.login(payload)

  successResponse(res, {
    token: jwt,
  })
}

export default {
  loginUser,
}
