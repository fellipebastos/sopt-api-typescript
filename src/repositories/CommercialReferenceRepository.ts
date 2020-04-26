import { EntityRepository, Repository, Not } from 'typeorm';

import CommercialReference from '../models/CommercialReference';

@EntityRepository(CommercialReference)
class CommercialReferenceRepository extends Repository<CommercialReference> {
  /**
   * Find customer by CNPJ.
   */
  public async findByName(
    name: string,
    ignoreId = '',
  ): Promise<CommercialReference | undefined> {
    const customer = await this.findOne({ where: { name, id: Not(ignoreId) } });

    return customer;
  }
}

export default CommercialReferenceRepository;
