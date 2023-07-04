import express, { Router } from 'express'
import {
  login,
  generateNewToken,
  demo,
  logout,
  register,
  addRole,
  getAllRoles,
} from '../controllers/authController'
import { validate } from '../helpers/validationHelper'
import { registerSchema, loginSchema } from '../validations/authValidation'

export const authRouter: Router = express.Router()

authRouter.get('/', demo)
authRouter.post('/role', addRole)
authRouter.get('/role', getAllRoles)
authRouter.post('/register', validate(registerSchema), register)
authRouter.post('/login', validate(loginSchema), login)
authRouter.post('/token', generateNewToken)
authRouter.post('/logout', logout)
