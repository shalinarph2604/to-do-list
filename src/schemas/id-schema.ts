import { z } from 'zod'

export const numberIdSchema = z.number({ coerce: true })

export const uuidSchema = z.string().uuid()

export default {
  numberIdSchema,
  uuidSchema,
}
