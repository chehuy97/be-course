import express, { Express } from 'express';
import { logging, routes, setup, database } from './startups';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

const app: Express = express();

dotenv.config();

logging();
setup(app);
routes(app);

const prisma = new PrismaClient();

prisma
  .$connect()
  .then(() => {
    console.log('Database connect successfully');
  })
  .catch((err) => {
    console.log('Database connect failurely', err);
  })
  .finally(() => {
    prisma.$disconnect();
  });

const port: string | number = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = server;
