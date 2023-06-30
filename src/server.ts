import express, { Express } from 'express';
import { logging, routes, setup, database } from './startups';
import dotenv from 'dotenv';

const app: Express = express();

dotenv.config();

logging();
database();
setup(app);
routes(app);

const port: string | number = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = server;
