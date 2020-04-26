/* eslint-disable no-param-reassign */
import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import httpCode from 'http-status-codes';

import addressRouter from './addresses.routes';

import CustomerRepository from '../repositories/CustomerRepository';

import CreateCustomerService from '../services/Customer/CreateCustomerService';
import UpdateCustomerService from '../services/Customer/UpdateCustomerService';
import ShowCustomerService from '../services/Customer/ShowCustomerService';
import DeleteCustomerService from '../services/Customer/DeleteCustomerService';

const customersRouter = Router();

customersRouter.get('/', async (request, response) => {
  const cutomerRepository = getCustomRepository(CustomerRepository);

  const customers = await cutomerRepository.find({
    order: { name: 'ASC' },
  });

  return response.json(customers);
});

customersRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const showUser = new ShowCustomerService();

  const customer = await showUser.execute({ id });

  return response.json(customer);
});

customersRouter.post('/', async (request, response) => {
  const {
    name,
    corporate_name,
    cnpj,
    state_registration,
    phone,
    cell_phone,
    email,
    email_nfe,
    email_fin,
    commercial_references,
  } = request.body;

  const createUser = new CreateCustomerService();

  const customer = await createUser.execute({
    name,
    corporate_name,
    cnpj,
    state_registration,
    phone,
    cell_phone,
    email,
    email_nfe,
    email_fin,
    commercial_references,
  });

  return response.json(customer);
});

customersRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const {
    name,
    corporate_name,
    cnpj,
    state_registration,
    phone,
    cell_phone,
    email,
    email_nfe,
    email_fin,
    commercial_references,
  } = request.body;

  const updateUser = new UpdateCustomerService();

  const customer = await updateUser.execute({
    id,
    name,
    corporate_name,
    cnpj,
    state_registration,
    phone,
    cell_phone,
    email,
    email_nfe,
    email_fin,
    commercial_references,
  });

  return response.json(customer);
});

customersRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteUser = new DeleteCustomerService();

  await deleteUser.execute({ id });

  return response.status(httpCode.NO_CONTENT).send();
});

customersRouter.use('/:id/addresses', addressRouter);

export default customersRouter;
