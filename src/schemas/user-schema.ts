import { z } from 'zod'
import { queryParamSchema } from './query-param-schema'

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
  name: z.string().min(2),
})
export type UserSchema = z.infer<typeof userSchema>

export const userSchemaPartial = userSchema.partial()
export type UserSchemaPartial = z.infer<typeof userSchemaPartial>

export const queryUserSchema = queryParamSchema.extend({
  name: z.string().trim().optional().default(''),
})
export type QueryUserSchema = z.infer<typeof queryUserSchema>

export default {
  userSchema,
  userSchemaPartial,
  queryUserSchema,
}
