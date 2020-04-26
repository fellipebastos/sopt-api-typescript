import { getCustomRepository } from 'typeorm';
import httpCode from 'http-status-codes';

import AppError from '../../errors/AppError';

import CommercialReferenceRepository from '../../repositories/CommercialReferenceRepository';

import CommercialReference from '../../models/CommercialReference';

interface Request {
  id: string;
  name: string;
  phone: string;
  phone_second: string;
}

class UpdateCommercialReferenceService {
  public async execute({
    id,
    name,
    phone,
    phone_second,
  }: Request): Promise<CommercialReference> {
    const commercialReferenceRepository = getCustomRepository(
      CommercialReferenceRepository,
    );

    const updateCommercialReference = await commercialReferenceRepository.preload(
      {
        id,
        name,
        phone,
        phone_second,
      },
    );

    if (!updateCommercialReference) {
      throw new AppError(
        'Referência comercial não encontrada.',
        httpCode.NOT_FOUND,
      );
    }

    const commercialReferenceExists = await commercialReferenceRepository.findByName(
      name,
      id,
    );

    if (commercialReferenceExists || !updateCommercialReference) {
      throw new AppError(
        'Este nome já está sendo utilizado por outra referência comercial.',
        httpCode.CONFLICT,
      );
    }

    const commercialReference = await commercialReferenceRepository.save(
      updateCommercialReference,
    );

    return commercialReference;
  }
}

export default UpdateCommercialReferenceService;
