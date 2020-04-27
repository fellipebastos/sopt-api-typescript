import { getRepository } from 'typeorm';
import httpCode from 'http-status-codes';

import AppError from '../../errors/AppError';

import Company from '../../models/Company';

interface Request {
  name: string;
}

class CreateCompanyService {
  public async execute({ name }: Request): Promise<Company> {
    const companyRepository = getRepository(Company);

    const hasCompany = await companyRepository.findOne({ where: { name } });

    if (hasCompany) {
      throw new AppError(
        'Este nome já está sendo utilizado por outra indústria.',
        httpCode.CONFLICT,
      );
    }

    const company = companyRepository.create({ name });

    await companyRepository.save(company);

    return company;
  }
}

export default CreateCompanyService;
