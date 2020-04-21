import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);

routes.use(ensureAuthenticated);

routes.use('/users', usersRouter);

export default routes;
