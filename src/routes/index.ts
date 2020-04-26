import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import companiesRouter from './companies.routes';
import customersRouter from './customers.routes';
import sessionsRouter from './sessions.routes';
import shipCompaniesRouter from './shipCompanies.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);

routes.use(ensureAuthenticated);

routes.use('/companies', companiesRouter);
routes.use('/customers', customersRouter);
routes.use('/ship-companies', shipCompaniesRouter);
routes.use('/users', usersRouter);

export default routes;
