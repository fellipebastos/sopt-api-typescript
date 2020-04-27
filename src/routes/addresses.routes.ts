/* eslint-disable no-param-reassign */
import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import httpCode from 'http-status-codes';

import AddressRepository from '../repositories/AddressRepository';

import CreateAddressService from '../services/Address/CreateService';
import UpdateAddressService from '../services/Address/UpdateService';
import ShowAddressService from '../services/Address/ShowService';
import DeleteAddressService from '../services/Address/DeleteService';

const addressesRouter = Router({ mergeParams: true });

addressesRouter.get('/', async (request, response) => {
  const { id: customer_id } = request.params;

  const addressRepository = getCustomRepository(AddressRepository);

  const addresses = await addressRepository.findByCustomer(customer_id);

  return response.json(addresses);
});

addressesRouter.get('/:address_id', async (request, response) => {
  const { id: customer_id, address_id } = request.params;

  const showAddress = new ShowAddressService();

  const address = await showAddress.execute({ id: address_id, customer_id });

  return response.json(address);
});

addressesRouter.post('/', async (request, response) => {
  const {
    name,
    street,
    complement,
    state,
    city,
    zip_code,
    neighborhood,
  } = request.body;
  const { id: customer_id } = request.params;

  const createAddress = new CreateAddressService();

  const address = await createAddress.execute({
    name,
    street,
    complement,
    state,
    city,
    zip_code,
    neighborhood,
    customer_id,
  });

  return response.json(address);
});

addressesRouter.put('/:address_id', async (request, response) => {
  const { id: customer_id, address_id } = request.params;
  const {
    name,
    street,
    complement,
    state,
    city,
    zip_code,
    neighborhood,
  } = request.body;

  const updateAddress = new UpdateAddressService();

  const address = await updateAddress.execute({
    id: address_id,
    name,
    street,
    complement,
    state,
    city,
    zip_code,
    neighborhood,
    customer_id,
  });

  return response.json(address);
});

addressesRouter.delete('/:address_id', async (request, response) => {
  const { id: customer_id, address_id } = request.params;

  const deleteAddress = new DeleteAddressService();

  await deleteAddress.execute({ id: address_id, customer_id });

  return response.status(httpCode.NO_CONTENT).send();
});

export default addressesRouter;
