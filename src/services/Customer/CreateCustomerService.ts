import { getCustomRepository } from 'typeorm';
import httpCode from 'http-status-codes';

import AppError from '../../errors/AppError';

import CustomerRepository from '../../repositories/CustomerRepository';
import CommercialReferenceRepository from '../../repositories/CommercialReferenceRepository';

import Customer from '../../models/Customer';

interface Request {
  name: string;
  corporate_name: string;
  cnpj: string;
  state_registration: string;
  phone: string;
  cell_phone: string;
  email: string;
  email_nfe: string;
  email_fin: string;
  commercial_references: string[];
}

class CreateCustomerService {
  public async execute({
    name,
    corporate_name,
    cnpj,
    state_registration,
    phone,
    cell_phone,
    email,
    email_nfe,
    email_fin,
    commercial_references,
  }: Request): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomerRepository);

    const foundCustomer = await customerRepository.findByCnpj(cnpj);

    if (foundCustomer) {
      throw new AppError(
        'Este CNPJ já está sendo utilizado por outro cliente.',
        httpCode.CONFLICT,
      );
    }

    const customer = customerRepository.create({
      name,
      corporate_name,
      cnpj,
      state_registration,
      phone,
      cell_phone,
      email,
      email_nfe,
      email_fin,
    });

    if (commercial_references && commercial_references.length) {
      const commercialReferenceRepository = getCustomRepository(
        CommercialReferenceRepository,
      );

      const commercialReferences = await commercialReferenceRepository.findByIds(
        commercial_references,
      );

      customer.commercial_references = commercialReferences;
    }

    await customerRepository.save(customer);

    return customer;
  }
}

export default CreateCustomerService;
