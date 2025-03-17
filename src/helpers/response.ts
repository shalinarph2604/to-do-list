import { Response } from 'express'

export const createdJsonResponse = (res: Response, data) => {
  return res.status(201).json({
    message: 'success',
    data,
  })
}

export const successJsonResponse = (res: Response, data) => {
  return res.status(200).json({
    message: 'success',
    data,
  })
}
