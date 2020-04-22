import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import sessionsRouter from './sessions.routes';
import usersRouter from './users.routes';
import shipCompaniesRouter from './shipCompanies.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);

routes.use(ensureAuthenticated);

routes.use('/users', usersRouter);
routes.use('/ship-companies', shipCompaniesRouter);

export default routes;
