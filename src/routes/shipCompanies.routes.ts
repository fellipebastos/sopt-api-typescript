/* eslint-disable no-param-reassign */
import { Router } from 'express';
import { getRepository } from 'typeorm';
import httpCode from 'http-status-codes';

import ShipCompany from '../models/ShipCompany';

import CreateShipCompanyService from '../services/ShipCompany/CreateService';
import UpdateShipCompanyService from '../services/ShipCompany/UpdateService';
import ShowShipCompanyService from '../services/ShipCompany/ShowService';
import DeleteShipCompanyService from '../services/ShipCompany/DeleteService';

const shipCompaniesRouter = Router();

shipCompaniesRouter.get('/', async (request, response) => {
  const shipCopmanyRepository = getRepository(ShipCompany);

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
