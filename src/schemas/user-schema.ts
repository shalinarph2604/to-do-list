import { z } from 'zod'

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
  name: z.string().min(2),
})
export type UserSchema = z.infer<typeof userSchema>

export const userSchemaPartial = userSchema.partial()
export type UserSchemaPartial = z.infer<typeof userSchemaPartial>

export default {
  userSchema,
  userSchemaPartial,
}
