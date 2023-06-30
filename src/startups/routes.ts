import express, { Express } from 'express';
import { authRouter } from '../routes/auth';
import { error } from '../middlewares/errorMiddleware';

export const routes = (app: Express) => {
  app.use('/', authRouter);
  app.use(error);
};
