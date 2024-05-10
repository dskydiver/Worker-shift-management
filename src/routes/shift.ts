import { FastifyPluginAsync, FastifyRequest } from 'fastify'
import {
  getAllShift,
  getShift,
  getWorkerShift,
  createShift,
  getDateShift,
} from '../controllers/shift'
import {
  CREATE_SHIFT_SCHEMA,
  CreateShiftSchema,
  GET_DATE_SHIFT_SCHEMA,
  GET_SHIFT_PARAM_SCHEMA,
  GET_WORKER_SHIFT_PARAM_SCHEMA,
  GetDateShiftSchema,
  GetShiftParam,
  GetWorkerShiftParam,
} from '../schemas/shift'

const shift: FastifyPluginAsync = async (fastify, options) => {
  fastify.route({
    method: 'GET',
    url: '/shifts',
    handler: async (request, reply) => {
      await getAllShift(request, reply)
    },
    schema: {
      tags: ['shift'],
    },
  })

  fastify.route({
    method: 'GET',
    url: '/shifts/:id',
    handler: async (
      request: FastifyRequest<{ Params: GetShiftParam }>,
      reply
    ) => {
      await getShift(request, reply)
    },
    schema: {
      tags: ['shift'],
      params: GET_SHIFT_PARAM_SCHEMA,
    },
  })

  fastify.route({
    method: 'GET',
    url: '/shifts/worker/:id',
    handler: async (
      request: FastifyRequest<{ Params: GetWorkerShiftParam }>,
      reply
    ) => {
      await getWorkerShift(request, reply)
    },
    schema: {
      tags: ['shift'],
      params: GET_WORKER_SHIFT_PARAM_SCHEMA,
    },
  })

  fastify.route({
    method: 'POST',
    url: '/shifts/date',
    handler: async (
      request: FastifyRequest<{ Body: GetDateShiftSchema }>,
      reply
    ) => {
      await getDateShift(request, reply)
    },
    schema: {
      tags: ['shift'],
      body: GET_DATE_SHIFT_SCHEMA,
    },
  })

  fastify.route({
    method: 'POST',
    url: '/shifts',
    handler: async (
      request: FastifyRequest<{ Body: CreateShiftSchema }>,
      reply
    ) => {
      await createShift(request, reply)
    },
    schema: {
      tags: ['shift'],
      body: CREATE_SHIFT_SCHEMA,
    },
  })
}

export default shift
