import { z } from 'zod'

const bookQuerySchema = z.object({
  search: z.string().optional(),
  limit: z.coerce.number().min(1).optional().default(10),
  page: z.coerce.number().min(1).optional().default(1),
})

export default bookQuerySchema
