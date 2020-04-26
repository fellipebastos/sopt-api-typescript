/* eslint-disable no-param-reassign */
import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import httpCode from 'http-status-codes';

import CommercialReferenceRepository from '../repositories/CommercialReferenceRepository';

import CreateCommercialReferenceService from '../services/CommercialReference/CreateService';
import UpdateCommercialReferenceService from '../services/CommercialReference/UpdateService';
import ShowCommercialReferenceService from '../services/CommercialReference/ShowService';
import DeleteCommercialReferenceService from '../services/CommercialReference/DeleteService';

const commercialReferencesRouter = Router();

commercialReferencesRouter.get('/', async (request, response) => {
  const commercialReferenceRepository = getCustomRepository(
    CommercialReferenceRepository,
  );

  const commercialReferences = await commercialReferenceRepository.find({
    order: { name: 'ASC' },
  });

  return response.json(commercialReferences);
});

commercialReferencesRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const showCommercialReference = new ShowCommercialReferenceService();

  const commercialReference = await showCommercialReference.execute({ id });

  return response.json(commercialReference);
});

commercialReferencesRouter.post('/', async (request, response) => {
  const { name, phone, phone_second } = request.body;

  const createCommercialReference = new CreateCommercialReferenceService();

  const commercialReference = await createCommercialReference.execute({
    name,
    phone,
    phone_second,
  });

  return response.json(commercialReference);
});

commercialReferencesRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { name, phone, phone_second } = request.body;

  const updateCommercialReference = new UpdateCommercialReferenceService();

  const commercialReference = await updateCommercialReference.execute({
    id,
    name,
    phone,
    phone_second,
  });

  return response.json(commercialReference);
});

commercialReferencesRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteCommercialReference = new DeleteCommercialReferenceService();

  await deleteCommercialReference.execute({ id });

  return response.status(httpCode.NO_CONTENT).send();
});

export default commercialReferencesRouter;
