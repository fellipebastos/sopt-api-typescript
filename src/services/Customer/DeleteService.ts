import { getCustomRepository } from 'typeorm';

import CustomerRepository from '../../repositories/CustomerRepository';

import ShowCustomerService from './ShowService';

interface Request {
  id: string;
}

class DeleteCustomerService {
  public async execute({ id }: Request): Promise<void> {
    const customerRepository = getCustomRepository(CustomerRepository);

    const showCustomer = new ShowCustomerService();

    await showCustomer.execute({ id });

    await customerRepository.delete(id);
  }
}

export default DeleteCustomerService;
