import { Request, Response } from 'express'
import constants from '../common/constants'
import { BadRequest, Unauthorized, logger } from '../helpers'

export const error = (
  err: any,
  req: Request,
  res: Response,
  next: () => void
) => {
  logger.error(err)
  console.log('ERROR:', err)
  switch (err.message) {
    case constants.ERROR.EXPIRED_TOKEN:
    case constants.ERROR.INVALID_TOKEN:
    case constants.ERROR.INVALID_TOKEN:
      return Unauthorized(res, {
        errorMessage: err.message,
      })
    default:
      return BadRequest(res, {
        errorMessage: err.message,
      })
  }
}
