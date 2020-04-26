import { getCustomRepository } from 'typeorm';
import httpCode from 'http-status-codes';

import AppError from '../../errors/AppError';

import CommercialReferenceRepository from '../../repositories/CommercialReferenceRepository';

import CommercialReference from '../../models/CommercialReference';

interface Request {
  id: string;
}

class ShowCommercialReferenceService {
  public async execute({ id }: Request): Promise<CommercialReference> {
    const commercialReferenceRepository = getCustomRepository(
      CommercialReferenceRepository,
    );

    const commercialReference = await commercialReferenceRepository.findOne(id);

    if (!commercialReference) {
      throw new AppError(
        'Referência comercial não encontrada.',
        httpCode.NOT_FOUND,
      );
    }

    return commercialReference;
  }
}

export default ShowCommercialReferenceService;
