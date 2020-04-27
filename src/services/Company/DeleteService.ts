import { getRepository } from 'typeorm';

import Company from '../../models/Company';

import ShowCompanyService from './ShowService';

interface Request {
  id: string;
}

class DeleteCompanyService {
  public async execute({ id }: Request): Promise<void> {
    const companyRepository = getRepository(Company);

    const showCompany = new ShowCompanyService();

    await showCompany.execute({ id });

    await companyRepository.delete(id);
  }
}

export default DeleteCompanyService;
