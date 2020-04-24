import { getRepository, Not } from 'typeorm';
import httpCode from 'http-status-codes';

import AppError from '../../errors/AppError';

import ShipCompany from '../../models/ShipCompany';

interface Request {
  id: string;
  name: string;
  phone: string;
}

class UpdateShipCompanyService {
  public async execute({ id, name, phone }: Request): Promise<ShipCompany> {
    const shipCompanyRepository = getRepository(ShipCompany);

    const updateShipCompany = await shipCompanyRepository.preload({
      id,
      name,
      phone,
    });

    if (!updateShipCompany) {
      throw new AppError('Transportadora não encontrada.', httpCode.NOT_FOUND);
    }

    const shipCompanySlugExists = await shipCompanyRepository.findOne({
      where: { name, id: Not(id) },
    });

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
