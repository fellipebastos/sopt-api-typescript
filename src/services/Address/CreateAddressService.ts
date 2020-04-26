import { getCustomRepository } from 'typeorm';
import httpCode from 'http-status-codes';

import AppError from '../../errors/AppError';

import AddressRepository from '../../repositories/AddressRepository';

import Address from '../../models/Address';

interface Request {
  name: string;
  street: string;
  complement: string;
  state: string;
  city: string;
  zip_code: string;
  neighborhood: string;
  customer_id: string;
}

class CreateAddressService {
  public async execute({
    name,
    street,
    complement,
    state,
    city,
    zip_code,
    neighborhood,
    customer_id,
  }: Request): Promise<Address> {
    const addressRepository = getCustomRepository(AddressRepository);

    const foundAddress = await addressRepository.findByName(name, customer_id);

    if (foundAddress) {
      throw new AppError(
        'Este nome já está sendo utilizado por outro endereço desse cliente.',
        httpCode.CONFLICT,
      );
    }

    const address = addressRepository.create({
      name,
      street,
      complement,
      state,
      city,
      zip_code,
      neighborhood,
      customer_id,
    });

    await addressRepository.save(address);

    return address;
  }
}

export default CreateAddressService;
