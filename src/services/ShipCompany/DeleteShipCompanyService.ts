import { getCustomRepository } from 'typeorm';

import ShipCompanyRepository from '../../repositories/ShipCompanyRepository';

import ShowShipCompanyService from './ShowShipCompanyService';

interface Request {
  id: string;
}

class DeleteShipCompanyService {
  public async execute({ id }: Request): Promise<void> {
    const shipCompanyRepository = getCustomRepository(ShipCompanyRepository);

    const showShipCompany = new ShowShipCompanyService();

    await showShipCompany.execute({ id });

    await shipCompanyRepository.delete(id);
  }
}

export default DeleteShipCompanyService;
