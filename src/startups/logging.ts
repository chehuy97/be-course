import { logger } from '../helpers/loggerHelper'

export const logging = () => {
  process.on('uncaughtException', (err: Error) => {
    logger.error(err.message)
    console.log(err)
    process.exit(1)
  })
}
