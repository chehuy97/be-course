import express, {Express} from 'express';
import {logging, routes, setup} from './startups';

const app:Express = express();
logging();
setup(app);
routes(app);

const port: string | number = process.env.PORT || 4000;

const server = app.listen(port, () => {
   console.log(`Listening on port ${port}`);
});

module.exports = server;
