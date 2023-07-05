import { NextFunction, Request, Response } from 'express'
import { ObjectSchema } from 'joi'
import { BadRequest } from '../helpers/responseHelper'

export const validate = (schema: ObjectSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body)

    if (error) {
      return BadRequest(res, { errorMessage: error.details[0].message })
    } else {
      next()
    }
  }
}
