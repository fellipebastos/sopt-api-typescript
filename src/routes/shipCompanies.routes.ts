/* eslint-disable no-param-reassign */
import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import httpCode from 'http-status-codes';

import ShipCompanyRepository from '../repositories/ShipCompanyRepository';

import CreateShipCompanyService from '../services/ShipCompany/CreateShipCompanyService';
import UpdateShipCompanyService from '../services/ShipCompany/UpdateShipCompanyService';
import ShowShipCompanyService from '../services/ShipCompany/ShowShipCompanyService';
import DeleteShipCompanyService from '../services/ShipCompany/DeleteShipCompanyService';

const shipCompaniesRouter = Router();

shipCompaniesRouter.get('/', async (request, response) => {
  const shipCopmanyRepository = getCustomRepository(ShipCompanyRepository);

  const shipCompanies = await shipCopmanyRepository.find({
    order: { name: 'ASC' },
  });

  return response.json(shipCompanies);
});

shipCompaniesRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const showUser = new ShowShipCompanyService();

  const user = await showUser.execute({ id });

  return response.json(user);
});

shipCompaniesRouter.post('/', async (request, response) => {
  const { name, phone } = request.body;

  const createShipCompany = new CreateShipCompanyService();

  const shipCompany = await createShipCompany.execute({ name, phone });

  return response.json(shipCompany);
});

shipCompaniesRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { name, phone } = request.body;

  const updateShipCompany = new UpdateShipCompanyService();

  const shipCompany = await updateShipCompany.execute({ id, name, phone });

  return response.json(shipCompany);
});

shipCompaniesRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteShipCompany = new DeleteShipCompanyService();

  await deleteShipCompany.execute({ id });

  return response.status(httpCode.NO_CONTENT).send();
});

export default shipCompaniesRouter;
