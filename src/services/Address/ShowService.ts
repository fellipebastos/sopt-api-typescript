import { getCustomRepository } from 'typeorm';
import httpCode from 'http-status-codes';

import AppError from '../../errors/AppError';

import AddressRepository from '../../repositories/AddressRepository';

import Address from '../../models/Address';

interface Request {
  id: string;
  customer_id: string;
}

class ShowAddressService {
  public async execute({ id, customer_id }: Request): Promise<Address> {
    const addressRepository = getCustomRepository(AddressRepository);

    const address = await addressRepository.findOneByCustomer(id, customer_id);

    if (!address) {
      throw new AppError('Endereço não encontrado.', httpCode.NOT_FOUND);
    }

    return address;
  }
}

export default ShowAddressService;
