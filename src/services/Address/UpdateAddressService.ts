import { getCustomRepository } from 'typeorm';
import httpCode from 'http-status-codes';

import AppError from '../../errors/AppError';

import AddressRepository from '../../repositories/AddressRepository';

import Address from '../../models/Address';

interface Request {
  id: string;
  name: string;
  street: string;
  complement: string;
  state: string;
  city: string;
  zip_code: string;
  neighborhood: string;
  customer_id: string;
}

class UpdateAddressService {
  public async execute({
    id,
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

    const updateAddress = await addressRepository.preload({
      id,
      name,
      street,
      complement,
      state,
      city,
      zip_code,
      neighborhood,
      customer_id,
    });

    if (!updateAddress) {
      throw new AppError('Endereço não encontrado.', httpCode.NOT_FOUND);
    }

    const addressExists = await addressRepository.findByName(
      name,
      customer_id,
      id,
    );

    if (addressExists || !updateAddress) {
      throw new AppError(
        'Este nome já está sendo utilizado por outro endereço desse cliente.',
        httpCode.CONFLICT,
      );
    }

    const address = await addressRepository.save(updateAddress);

    return address;
  }
}

export default UpdateAddressService;
