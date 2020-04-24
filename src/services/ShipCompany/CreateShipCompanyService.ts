import { getRepository } from 'typeorm';
import httpCode from 'http-status-codes';

import AppError from '../../errors/AppError';

import ShipCompany from '../../models/ShipCompany';

interface Request {
  name: string;
  phone: string;
}

class CreateShipCompanyService {
  public async execute({ name, phone }: Request): Promise<ShipCompany> {
    const shipCompanyRepository = getRepository(ShipCompany);

    const hasShipCompany = await shipCompanyRepository.findOne({
      where: { name },
    });

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
