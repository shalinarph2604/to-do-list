import { z } from 'zod'

export const queryParamSchema = z.object({
  limit: z.number({
    coerce: true,
  }).positive().optional().default(10),
  page: z.number({
    coerce: true,
  }).positive().optional().default(1),
  search: z.string().trim().optional().default(''),
  order_by: z.string().trim().optional().default('createdAt'),
  order_direction: z.enum(['asc', 'desc']).optional().default('asc').transform(val => val.toLowerCase()),
})

export type QueryParamSchema = z.infer<typeof queryParamSchema>

export default {
  queryParamSchema,
}
