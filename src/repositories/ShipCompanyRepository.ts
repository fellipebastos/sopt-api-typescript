import { EntityRepository, Repository, Not } from 'typeorm';

import ShipCompany from '../models/ShipCompany';

@EntityRepository(ShipCompany)
class ShipCompanyRepository extends Repository<ShipCompany> {
  /**
   * Find ship company by slug.
   */
  public async findBySlug(
    slug: string,
    ignoreId = '',
  ): Promise<ShipCompany | undefined> {
    const shipCompany = await this.findOne({
      where: { slug, id: Not(ignoreId) },
    });

    return shipCompany;
  }
}

export default ShipCompanyRepository;
