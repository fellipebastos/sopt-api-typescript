import { getCustomRepository } from 'typeorm';
import httpCode from 'http-status-codes';

import AppError from '../../errors/AppError';

import CommercialReferenceRepository from '../../repositories/CommercialReferenceRepository';

import CommercialReference from '../../models/CommercialReference';

interface Request {
  name: string;
  phone: string;
  phone_second: string;
}

class CreateCommercialReferenceService {
  public async execute({
    name,
    phone,
    phone_second,
  }: Request): Promise<CommercialReference> {
    const commercialReferenceRepository = getCustomRepository(
      CommercialReferenceRepository,
    );

    const foundCommmercialReference = await commercialReferenceRepository.findByName(
      name,
    );

    if (foundCommmercialReference) {
      throw new AppError(
        'Este nome já está sendo utilizado por outra referência comercial.',
        httpCode.CONFLICT,
      );
    }

    const commercialReference = commercialReferenceRepository.create({
      name,
      phone,
      phone_second,
    });

    await commercialReferenceRepository.save(commercialReference);

    return commercialReference;
  }
}

export default CreateCommercialReferenceService;
