import Joi from 'joi'
import constants from '../common/constants'

export const registerSchema = Joi.object({
  email: Joi.string().regex(constants.REGEX.EMAIL).required(),
  phone: Joi.string().regex(constants.REGEX.PHONE_NUMBER).optional(),
  fullname: Joi.string().required(),
  username: Joi.string().min(8).required(),
  password: Joi.string().min(8).required(),
  avatar: Joi.string().optional(),
  dateOfBirth: Joi.string().optional(),
  gender: Joi.string().optional(),
})

export const loginSchema = Joi.object({
  email: Joi.string().regex(constants.REGEX.EMAIL).required(),
  password: Joi.string().min(8).required(),
})
