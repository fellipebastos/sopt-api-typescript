import { getCustomRepository } from 'typeorm';
import httpCode from 'http-status-codes';

import AppError from '../../errors/AppError';

import CompanyRepository from '../../repositories/CompanyRepository';

import Company from '../../models/Company';

import slugify from '../../utils/slugify';

interface Request {
  name: string;
}

class CreateCompanyService {
  public async execute({ name }: Request): Promise<Company> {
    const companyRepository = getCustomRepository(CompanyRepository);

    const hasCompany = await companyRepository.findBySlug(slugify(name));

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
