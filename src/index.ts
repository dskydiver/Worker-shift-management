import prisma from '../database'
import logger from '../logger'
import { build } from './server'

const start = async () => {
  const server = await build()

  // Graceful Shutdown
  const gracefulShutdown = async (signal: string) => {
    logger.info(`* Received signal: ${signal} *`)
    logger.info('Closing fastify server...')
    await server.close()

    // Here you'd also handle your database disconnection, if needed.
    await prisma.$disconnect()

    logger.info('Server successfully closed')
    process.exit(0)
  }

  // Handling termination and interrupt signals
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
  process.on('SIGINT', () => gracefulShutdown('SIGINT'))

  const portDetail: number = Number(process.env.PORT) || 5000

  await server.listen({ port: portDetail })
  logger.info(`server running on port ${portDetail}`)
}

start().catch((error) => {
  logger.error(error)
  process.exit(1)
})
