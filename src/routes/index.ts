import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import sessionsRouter from './sessions.routes';
import usersRouter from './users.routes';
import shipCompaniesRouter from './shipCompanies.routes';
import companiesRouter from './companies.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);

routes.use(ensureAuthenticated);

routes.use('/companies', companiesRouter);
routes.use('/ship-companies', shipCompaniesRouter);
routes.use('/users', usersRouter);

export default routes;
