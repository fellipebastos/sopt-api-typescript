import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';

import routes from './routes';
import ErrorHandler from './middlewares/ErrorHandler';

const app = express();

app.use(express.json());
app.use(routes);

app.use(ErrorHandler);

export default app;
