import { getCustomRepository } from 'typeorm';

import AddressRepository from '../../repositories/AddressRepository';

import ShowAddressService from './ShowService';

interface Request {
  id: string;
  customer_id: string;
}

class DeleteAddressService {
  public async execute({ id, customer_id }: Request): Promise<void> {
    const addressRepository = getCustomRepository(AddressRepository);

    const showAddress = new ShowAddressService();

    await showAddress.execute({ id, customer_id });

    await addressRepository.delete(id);
  }
}

export default DeleteAddressService;
