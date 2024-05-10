import prisma from '../../database'
import logger from '../../logger'

export const getAllWorker = async () => {
  try {
    const workers = prisma.worker.findMany()
    return workers
  } catch (error) {
    logger.debug({ error })
    throw new Error('Error fetching workers from DB.')
  }
}

export const createWorker = async (email: string, name: string) => {
  try {
    const worker = prisma.worker.create({
      data: {
        name,
        email,
      },
    })
    return worker
  } catch (error) {
    logger.debug({ error })
    throw new Error('Error creating worker in DB.')
  }
}

export const getWorker = async (id: string) => {
  try {
    const worker = prisma.worker.findUnique({
      where: {
        id,
      },
      include: {
        workerShifts: {
          select: {
            shiftDate: true,
            shiftTime: true,
          },
        },
      },
    })
    return worker
  } catch (error) {
    logger.debug({ error })
    throw new Error('Error fetching worker from DB.')
  }
}
