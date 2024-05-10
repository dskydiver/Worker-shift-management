import prisma, { ShiftTime } from '../../database'
import logger from '../../logger'

export const getAllShift = async () => {
  try {
    const shifts = await prisma.workerShift.findMany()
    return shifts
  } catch (error) {
    logger.debug({ error })
    throw new Error('Error fetching shifts from DB.')
  }
}

export const getShift = async (id: string) => {
  try {
    const shift = await prisma.workerShift.findFirst({
      where: {
        id,
      },
      include: {
        worker: true,
      },
    })
    return shift
  } catch (error) {
    logger.debug({ error })
    throw new Error('Error fetching shift from DB.')
  }
}

export const getWorkerShift = async (id: string) => {
  try {
    const shifts = await prisma.workerShift.findMany({
      where: {
        workerId: id,
      },
    })
    return shifts
  } catch (error) {
    logger.debug({ error })
    throw new Error('Error fetching shifts from DB.')
  }
}

export const createShift = async (
  workerId: string,
  shiftDate: Date,
  shiftTime: ShiftTime
) => {
  try {
    const shift = await prisma.workerShift.create({
      data: {
        workerId,
        shiftDate,
        shiftTime,
      },
    })
    return shift
  } catch (error) {
    logger.debug({ error })
    throw new Error('Error creating shift in DB.')
  }
}

export const getDateShift = async (shiftDate: Date) => {
  try {
    const shifts = await prisma.workerShift.findMany({
      where: {
        shiftDate,
      },
    })
    return shifts
  } catch (error) {
    logger.debug({ error })
    throw new Error('Error fetching shifts from DB.')
  }
}
