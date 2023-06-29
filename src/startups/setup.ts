import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import { configs } from '../configs';
import morgan from 'morgan';

export const setup = (app: Express) => {
  app.use(helmet());
  app.use(compression());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors(configs.cors));
  app.use(morgan('tiny'));
  app.use(cookieParser());
};
