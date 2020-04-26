import { getCustomRepository } from 'typeorm';
import httpCode from 'http-status-codes';

import AppError from '../../errors/AppError';

import CustomerRepository from '../../repositories/CustomerRepository';

import Customer from '../../models/Customer';

interface Request {
  id: string;
}

class ShowCustomerService {
  public async execute({ id }: Request): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomerRepository);

    const customer = await customerRepository.findOne(id);

    if (!customer) {
      throw new AppError('Cliente não encontrado.', httpCode.NOT_FOUND);
    }

    return customer;
  }
}

export default ShowCustomerService;
