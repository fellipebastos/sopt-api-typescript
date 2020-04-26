import { getCustomRepository } from 'typeorm';

import CommercialReferenceRepository from '../../repositories/CommercialReferenceRepository';

import ShowCommercialReferenceService from './ShowService';

interface Request {
  id: string;
}

class DeleteCommercialReferenceService {
  public async execute({ id }: Request): Promise<void> {
    const commercialReferenceRepository = getCustomRepository(
      CommercialReferenceRepository,
    );

    const showCommercialReference = new ShowCommercialReferenceService();

    await showCommercialReference.execute({ id });

    await commercialReferenceRepository.delete(id);
  }
}

export default DeleteCommercialReferenceService;
