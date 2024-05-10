import { ShiftTime } from '@prisma/client'
import { z } from 'zod'

export const GET_SHIFT_PARAM_SCHEMA = z.object({
  id: z.string().min(1),
})
export type GetShiftParam = z.infer<typeof GET_SHIFT_PARAM_SCHEMA>

export const GET_WORKER_SHIFT_PARAM_SCHEMA = z.object({
  id: z.string().min(1),
})
export type GetWorkerShiftParam = z.infer<typeof GET_WORKER_SHIFT_PARAM_SCHEMA>

export const CREATE_SHIFT_SCHEMA = z.object({
  workerId: z.string().min(1),
  shiftDate: z.string().refine((date) => new Date(date) instanceof Date),
  shiftTime: z.nativeEnum(ShiftTime),
})
export type CreateShiftSchema = z.infer<typeof CREATE_SHIFT_SCHEMA>

export const GET_DATE_SHIFT_SCHEMA = z.object({
  shiftDate: z.string().refine((date) => new Date(date) instanceof Date),
})
export type GetDateShiftSchema = z.infer<typeof GET_DATE_SHIFT_SCHEMA>
