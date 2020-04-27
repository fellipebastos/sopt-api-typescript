import { getRepository } from 'typeorm';

import ShipCompany from '../../models/ShipCompany';

import ShowShipCompanyService from './ShowService';

interface Request {
  id: string;
}

class DeleteShipCompanyService {
  public async execute({ id }: Request): Promise<void> {
    const shipCompanyRepository = getRepository(ShipCompany);

    const showShipCompany = new ShowShipCompanyService();

    await showShipCompany.execute({ id });

    await shipCompanyRepository.delete(id);
  }
}

export default DeleteShipCompanyService;
