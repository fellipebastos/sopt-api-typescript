import { getCustomRepository } from 'typeorm';
import httpCode from 'http-status-codes';

import AppError from '../../errors/AppError';

import ShipCompanyRepository from '../../repositories/ShipCompanyRepository';

import ShipCompany from '../../models/ShipCompany';

import slugify from '../../utils/slugify';

interface Request {
  name: string;
  phone: string;
}

class CreateShipCompanyService {
  public async execute({ name, phone }: Request): Promise<ShipCompany> {
    const shipCompanyRepository = getCustomRepository(ShipCompanyRepository);

    const hasShipCompany = await shipCompanyRepository.findBySlug(
      slugify(name),
    );

    if (hasShipCompany) {
      throw new AppError(
        'Este nome já está sendo utilizado por outra transportadora.',
        httpCode.CONFLICT,
      );
    }

    const shipCompany = shipCompanyRepository.create({ name, phone });

    await shipCompanyRepository.save(shipCompany);

    return shipCompany;
  }
}

export default CreateShipCompanyService;
