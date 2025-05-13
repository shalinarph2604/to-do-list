import { z } from 'zod'

export const taskSchema = z.object({ // yang bakal diinput manual oleh user
  title: z.string(),
  brief: z.string().nullable(),
  category: z.string().nullable(),
  icon: z.string().nullable(),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  deadline: z.coerce.date().nullable(),
  completed: z.boolean(),
})

export type TaskSchema = z.infer<typeof taskSchema>

export const taskSchemaPartial = taskSchema.partial() // tidak semua field harus diisi, bisa diisi sebagian saja

export type TaskSchemaPartial = z.infer<typeof taskSchemaPartial>

export const queryTaskSchema = z.object({
  is_completed: z.enum(['true', 'false', '']).optional().default(''), // mengetahui status task
})

export type QueryTaskSchema = z.infer<typeof queryTaskSchema>

export default { taskSchema, taskSchemaPartial, queryTaskSchema }
