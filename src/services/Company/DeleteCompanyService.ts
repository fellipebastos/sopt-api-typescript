import { getCustomRepository } from 'typeorm';

import CompanyRepository from '../../repositories/CompanyRepository';

import ShowCompanyService from './ShowCompanyService';

interface Request {
  id: string;
}

class DeleteCompanyService {
  public async execute({ id }: Request): Promise<void> {
    const companyRepository = getCustomRepository(CompanyRepository);

    const showCompany = new ShowCompanyService();

    await showCompany.execute({ id });

    await companyRepository.delete(id);
  }
}

export default DeleteCompanyService;
