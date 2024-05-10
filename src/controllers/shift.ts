import { FastifyReply, FastifyRequest } from 'fastify'
import logger from '../../logger'
import * as shiftDal from '../dal/shift'
import {
  CreateShiftSchema,
  GetDateShiftSchema,
  GetShiftParam,
  GetWorkerShiftParam,
} from '../schemas/shift'
export const getAllShift = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const shifts = await shiftDal.getAllShift()
    return reply.send({ success: true, data: shifts })
  } catch (error) {
    logger.debug({ error })
    return reply.code(400).send({ error })
  }
}

export const getShift = async (
  request: FastifyRequest<{ Params: GetShiftParam }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params
    const shift = await shiftDal.getShift(id)
    return reply.send({ success: true, data: shift })
  } catch (error) {
    logger.debug({ error })
    return reply.code(400).send({ error })
  }
}

export const getWorkerShift = async (
  request: FastifyRequest<{ Params: GetWorkerShiftParam }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params
    const shifts = await shiftDal.getWorkerShift(id)
    return reply.send({ success: true, data: shifts })
  } catch (error) {
    logger.debug({ error })
    return reply.code(400).send({ error })
  }
}

export const createShift = async (
  request: FastifyRequest<{ Body: CreateShiftSchema }>,
  reply: FastifyReply
) => {
  const { workerId, shiftDate, shiftTime } = request.body
  try {
    const shift = await shiftDal.createShift(
      workerId,
      new Date(shiftDate),
      shiftTime
    )
    return reply.send({ success: true, data: shift })
  } catch (error) {
    logger.debug({ error })
    return reply.code(400).send({ error: 'Error creating shift' })
  }
}

export const getDateShift = async (
  request: FastifyRequest<{ Body: GetDateShiftSchema }>,
  reply: FastifyReply
) => {
  try {
    const { shiftDate } = request.body
    const shifts = await shiftDal.getDateShift(new Date(shiftDate))
    return reply.send({ success: true, data: shifts })
  } catch (error) {
    logger.debug({ error })
    return reply.code(400).send({ error })
  }
}
