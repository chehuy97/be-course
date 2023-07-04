import Joi from 'joi';
import constants from '../common/constants';

export const registerSchema = Joi.object({
  email: Joi.string().regex(constants.REGEX.EMAIL).required(),
  phone: Joi.string().regex(constants.REGEX.PHONE_NUMBER).required(),
  fullname: Joi.string().required(),
  username: Joi.string().min(8).required(),
  password: Joi.string().min(8).required(),
  avatar: Joi.string().required(),
  dateOfBirth: Joi.string().required(),
  gender: Joi.string().required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().regex(constants.REGEX.EMAIL).required(),
  password: Joi.string().min(8).required(),
});
