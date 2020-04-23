import { getCustomRepository } from 'typeorm';
import httpCode from 'http-status-codes';

import AppError from '../../errors/AppError';

import ShipCompanyRepository from '../../repositories/ShipCompanyRepository';

import ShipCompany from '../../models/ShipCompany';

interface Request {
  id: string;
}

class ShowShipCompanyService {
  public async execute({ id }: Request): Promise<ShipCompany> {
    const shipCompanyRepository = getCustomRepository(ShipCompanyRepository);

    const shipCompany = await shipCompanyRepository.findOne(id);

    if (!shipCompany) {
      throw new AppError('Transportadora não encontrada.', httpCode.NOT_FOUND);
    }

    return shipCompany;
  }
}

export default ShowShipCompanyService;