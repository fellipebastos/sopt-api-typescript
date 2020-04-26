import {
  EntityRepository,
  Repository,
  Not,
  SelectQueryBuilder,
  Brackets,
} from 'typeorm';

import Address from '../models/Address';

@EntityRepository(Address)
class AddressRepository extends Repository<Address> {
  private whereHasCustomer(customer_id: string): SelectQueryBuilder<Address> {
    return this.createQueryBuilder('address').where({ customer_id });
  }

  /**
   * Find addresses by customer id.
   */
  public async findByCustomer(customer_id: string): Promise<Address[]> {
    const addresses = await this.whereHasCustomer(customer_id).getMany();

    return addresses;
  }

  /**
   * Find address by customer id.
   */
  public async findOneByCustomer(
    id: string,
    customer_id: string,
  ): Promise<Address | undefined> {
    const address = await this.whereHasCustomer(customer_id)
      .andWhere('address.id = :id', { id })
      .getOne();

    return address;
  }

  /**
   * Find customer by CNPJ.
   */
  public async findByName(
    name: string,
    customer_id: string,
    ignore_id = '',
  ): Promise<Address | undefined> {
    const address = await this.whereHasCustomer(customer_id)
      .andWhere('name = :name', { name })
      .andWhere('id != :ignore_id', { ignore_id })
      .getOne();

    return address;
  }
}

export default AddressRepository;
