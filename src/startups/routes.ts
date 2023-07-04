import express, { Express } from 'express'
import { authRouter } from '../routes/auth'
import { error } from '../middlewares/errorMiddleware'
import { accountRouter } from '../routes/account'

export const routes = (app: Express) => {
  app.use('/api/auth', authRouter)
  app.use('/api/user', accountRouter)
  app.use(error)
}
