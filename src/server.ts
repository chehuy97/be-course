import express, { Express } from 'express';
import { logging, production } from './startup';

const app: Express = express();

logging();
production(app);

const port: string | number = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Listenig at port: ${port}`);
});

module.exports = server;
