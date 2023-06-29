import express, { Router } from 'express'
import { login, generateNewToken, demo, logout } from '../controllers/authController'

export const authRouter:Router = express.Router()

authRouter.get('/', demo)
authRouter.post('/login', login)
authRouter.post('/token', generateNewToken)
authRouter.post('/logout', logout)