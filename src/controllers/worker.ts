import { FastifyReply, FastifyRequest } from 'fastify'
import * as workerDal from '../dal/worker'
import { CreateWorkerRequestBody, GetWorkerParam } from '../schemas/worker'
import logger from '../../logger'

export const getAllWorker = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const workers = await workerDal.getAllWorker()
    return reply.send({ success: true, data: workers })
  } catch (error) {
    logger.debug(error)
    return reply.code(400).send({ error })
  }
}

export const createWorker = async (
  request: FastifyRequest<{ Body: CreateWorkerRequestBody }>,
  reply: FastifyReply
) => {
  const { email, name } = request.body
  try {
    const worker = await workerDal.createWorker(email, name)
    return reply.send({ success: true, data: worker })
  } catch (error) {
    return reply.code(400).send({ error })
  }
}

export const getWorker = async (
  request: FastifyRequest<{ Params: GetWorkerParam }>,
  reply: FastifyReply
) => {
  const { id } = request.params
  try {
    const worker = await workerDal.getWorker(id)
    return reply.send({ success: true, data: worker })
  } catch (error) {
    logger.debug(error)
    return reply.code(400).send({ error })
  }
}
