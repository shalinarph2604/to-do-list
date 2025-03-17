import { z } from 'zod'

const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
})
export type UserLoginSchema = z.infer<typeof userLoginSchema>

export default {
  userLoginSchema,
}
