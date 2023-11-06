import { PrismaClient } from '@prisma/client'
import logger from './logging.js'

const prisma = new PrismaClient({
  errorFormat: 'minimal',
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'error',
    },
    {
      emit: 'event',
      level: 'info',
    },
    {
      emit: 'event',
      level: 'warn',
    },
  ],
})

prisma.$on('error', (e) => {
  console.error(e.message.replaceAll(/^\?\s/gm, '  '))
  logger.error(e)
})

prisma.$on('warn', (e) => {
  logger.warn(e)
})

prisma.$on('info', (e) => {
  logger.info(e)
})

prisma.$on('query', (e) => {
  logger.info(e)
})

export default prisma