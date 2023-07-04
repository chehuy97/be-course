import { transports, createLogger, format, Logger } from 'winston'

const { combine, timestamp, prettyPrint, json } = format

export const logger: Logger = createLogger({
  level: 'info',
  format: combine(timestamp(), json(), prettyPrint({ colorize: true })),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'app.log' }),
  ],
})
