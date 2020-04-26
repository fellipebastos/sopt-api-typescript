import { EntityRepository, Repository, Not } from 'typeorm';

import Customer from '../models/Customer';

@EntityRepository(Customer)
class CustomerRepository extends Repository<Customer> {
  /**
   * Find customer by CNPJ.
   */
  public async findByCnpj(
    cnpj: string,
    ignoreId = '',
  ): Promise<Customer | undefined> {
    const customer = await this.findOne({ where: { cnpj, id: Not(ignoreId) } });

    return customer;
  }
}

export default CustomerRepository;
