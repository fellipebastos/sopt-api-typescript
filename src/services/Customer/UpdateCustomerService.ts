import { getCustomRepository } from 'typeorm';
import httpCode from 'http-status-codes';

import AppError from '../../errors/AppError';

import CustomerRepository from '../../repositories/CustomerRepository';
import CommercialReferenceRepository from '../../repositories/CommercialReferenceRepository';

import Customer from '../../models/Customer';

interface Request {
  id: string;
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

class UpdateCustomerService {
  public async execute({
    id,
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

    const updateCustomer = await customerRepository.preload({
      id,
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

    if (!updateCustomer) {
      throw new AppError('Cliente não encontrado.', httpCode.NOT_FOUND);
    }

    const customerExists = await customerRepository.findByCnpj(cnpj, id);

    if (customerExists || !updateCustomer) {
      throw new AppError(
        'Este CNPJ já está sendo utilizado por outro cliente.',
        httpCode.CONFLICT,
      );
    }

    if (commercial_references && commercial_references.length) {
      const commercialReferenceRepository = getCustomRepository(
        CommercialReferenceRepository,
      );

      const commercialReferences = await commercialReferenceRepository.findByIds(
        commercial_references,
      );

      updateCustomer.commercial_references = commercialReferences;
    }

    const customer = await customerRepository.save(updateCustomer);

    return customer;
  }
}

export default UpdateCustomerService;
