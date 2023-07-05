import express, { Express } from 'express'
import { authRouter } from '../routes/auth'
import { error } from '../middlewares/errorMiddleware'
import { accountRouter } from '../routes/account'
import { courseRouter } from '../routes/courses'

export const routes = (app: Express) => {
  app.use('/api/auth', authRouter)
  app.use('/api/user', accountRouter)
  app.use('/api/course', courseRouter)
  app.use(error)
}
