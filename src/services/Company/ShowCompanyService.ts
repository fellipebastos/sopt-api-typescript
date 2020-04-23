import { getCustomRepository } from 'typeorm';
import httpCode from 'http-status-codes';

import AppError from '../../errors/AppError';

import CompanyRepository from '../../repositories/CompanyRepository';

import Company from '../../models/Company';

interface Request {
  id: string;
}

class ShowCompanyService {
  public async execute({ id }: Request): Promise<Company> {
    const companyRepository = getCustomRepository(CompanyRepository);

    const company = await companyRepository.findOne(id);

    if (!company) {
      throw new AppError('Indústria não encontrada.', httpCode.NOT_FOUND);
    }

    return company;
  }
}

export default ShowCompanyService;
