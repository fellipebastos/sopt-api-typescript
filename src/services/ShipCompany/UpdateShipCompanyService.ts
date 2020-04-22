import { getCustomRepository } from 'typeorm';
import httpCode from 'http-status-codes';

import AppError from '../../errors/AppError';

import ShipCompanyRepository from '../../repositories/ShipCompanyRepository';

import ShipCompany from '../../models/ShipCompany';

import slugify from '../../utils/slugify';

interface Request {
  id: string;
  name: string;
  phone: string;
}

class UpdateShipCompanyService {
  public async execute({ id, name, phone }: Request): Promise<ShipCompany> {
    const shipCompanyRepository = getCustomRepository(ShipCompanyRepository);

    const updateShipCompany = await shipCompanyRepository.preload({
      id,
      name,
      phone,
    });

    if (!updateShipCompany) {
      throw new AppError('Transportadora não encontrada.', httpCode.NOT_FOUND);
    }

    const shipCompanySlugExists = await shipCompanyRepository.findBySlug(
      slugify(name),
      id,
    );

    if (shipCompanySlugExists || !updateShipCompany) {
      throw new AppError(
        'Este nome já está sendo utilizado por outra transportadora.',
        httpCode.CONFLICT,
      );
    }

    const shipCompany = await shipCompanyRepository.save(updateShipCompany);

    return shipCompany;
  }
}

export default UpdateShipCompanyService;
