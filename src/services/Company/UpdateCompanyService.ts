import { getRepository, Not } from 'typeorm';
import httpCode from 'http-status-codes';

import AppError from '../../errors/AppError';

import Company from '../../models/Company';

interface Request {
  id: string;
  name: string;
}

class UpdateCompanyService {
  public async execute({ id, name }: Request): Promise<Company> {
    const companyRepository = getRepository(Company);

    const updateCompany = await companyRepository.preload({
      id,
      name,
    });

    if (!updateCompany) {
      throw new AppError('Indústria não encontrada.', httpCode.NOT_FOUND);
    }

    const companySlugExists = await companyRepository.findOne({
      where: { name, id: Not(id) },
    });

    if (companySlugExists || !updateCompany) {
      throw new AppError(
        'Este nome já está sendo utilizado por outra indústria.',
        httpCode.CONFLICT,
      );
    }

    const company = await companyRepository.save(updateCompany);

    return company;
  }
}

export default UpdateCompanyService;
