import { z } from 'zod'

export const CREATE_WORKER_SCHEMA = z.object({
  email: z.string().email(),
  name: z.string().min(1),
})
export type CreateWorkerRequestBody = z.infer<typeof CREATE_WORKER_SCHEMA>

export const GET_WORKER_PARAM_SCHEMA = z.object({
  id: z.string().min(1),
})
export type GetWorkerParam = z.infer<typeof GET_WORKER_PARAM_SCHEMA>
