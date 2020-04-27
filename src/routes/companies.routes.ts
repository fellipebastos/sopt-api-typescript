/* eslint-disable no-param-reassign */
import { Router } from 'express';
import { getRepository } from 'typeorm';
import httpCode from 'http-status-codes';

import productsRouter from './products.routes';

import Company from '../models/Company';

import CreateCompanyService from '../services/Company/CreateService';
import UpdateCompanyService from '../services/Company/UpdateService';
import ShowCompanyService from '../services/Company/ShowService';
import DeleteCompanyService from '../services/Company/DeleteService';

const companiesRouter = Router();

companiesRouter.get('/', async (request, response) => {
  const companyRepository = getRepository(Company);

  const companies = await companyRepository.find({
    order: { name: 'ASC' },
  });

  return response.json(companies);
});

companiesRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const showUser = new ShowCompanyService();

  const user = await showUser.execute({ id });

  return response.json(user);
});

companiesRouter.post('/', async (request, response) => {
  const { name, phone } = request.body;

  const createCompany = new CreateCompanyService();

  const company = await createCompany.execute({ name, phone });

  return response.json(company);
});

companiesRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { name, phone } = request.body;

  const updateCompany = new UpdateCompanyService();

  const company = await updateCompany.execute({ id, name, phone });

  return response.json(company);
});

companiesRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteCompany = new DeleteCompanyService();

  await deleteCompany.execute({ id });

  return response.status(httpCode.NO_CONTENT).send();
});

companiesRouter.use('/:id/products', productsRouter);

export default companiesRouter;
