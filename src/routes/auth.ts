import express, { Router } from 'express'
import {
  login,
  loginByGoogle,
  generateNewToken,
  demo,
  logout,
  register,
  addRole,
  getAllRoles,
  forgotPassword,
  resetPassword,
  loginByGoogleCallback
} from '../controllers/authController'
import { validate } from '../helpers/validationHelper'
import { registerSchema, loginSchema } from '../validations/authValidation'

export const authRouter: Router = express.Router()

authRouter.get('/', demo)
authRouter.post('/role', addRole)
authRouter.get('/role', getAllRoles)
authRouter.post('/register', validate(registerSchema), register)
authRouter.post('/login', validate(loginSchema), login)
authRouter.get('/login-by-google', loginByGoogle)
authRouter.get('/login-by-google/callback', loginByGoogleCallback)
authRouter.post('/token', generateNewToken)
authRouter.post('/forgot-password', forgotPassword)
authRouter.post('/reset-password', resetPassword)
authRouter.post('/logout', logout)
