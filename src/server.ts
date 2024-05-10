import { fastifySwagger, SwaggerOptions } from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import dotenv from 'dotenv'
import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod2'
import shift from './routes/shift'
import worker from './routes/worker'
import logger from '../logger'

export const build = async () => {
  const server = fastify({
    logger: {
      level: 'info',
      transport: {
        target: 'pino-pretty',
      },
    },
  }).withTypeProvider<ZodTypeProvider>()

  dotenv.config()

  server.setValidatorCompiler(validatorCompiler)
  server.setSerializerCompiler(serializerCompiler)

  const swaggerOptions: SwaggerOptions = {
    swagger: {
      info: {
        title: 'API Documentation',
        description: 'API documentation for your Fastify application.',
        version: '1.0.0',
      },
      consumes: ['application/json'],
      produces: ['application/json'],
      securityDefinitions: {
        BearerAuth: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
        },
      },
    },
    transform: jsonSchemaTransform,
  }

  const swaggerUiOptions = {
    routePrefix: 'documentation',
    exposeRoute: true,
  }

  // Register the Swagger plugin
  server.register(fastifySwagger, swaggerOptions)

  server.register(fastifySwaggerUI, swaggerUiOptions)

  server.register(worker)
  server.register(shift)

  server.get('/', (req, reply) => {
    reply.send({ success: true, message: 'Welcome to the API' })
  })

  // if route not found
  server.setNotFoundHandler((request, reply) => {
    reply.code(404).send({ success: false, message: 'Route not found' })
  })

  if (process.env.DEPLOY_ENV === 'production') {
    server.setErrorHandler((error, request, reply) => {
      logger.debug(error)
      if (error.code === 'FST_ERR_VALIDATION') {
        reply.status(400).send({
          error: 'Bad Request',
          message: 'Invalid request parameters',
        })
      } else {
        reply.send(error)
      }
    })
  }

  process.on('unhandledRejection', function (reason: any, promise: any) {
    console.log(
      'unhandledRejection ' +
        promise.toString() +
        ' stack ' +
        JSON.stringify(reason.stack)
    )
  })

  return server
}
