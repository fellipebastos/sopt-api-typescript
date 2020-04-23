import { EntityRepository, Repository, Not } from 'typeorm';

import Company from '../models/Company';

@EntityRepository(Company)
class CompanyRepository extends Repository<Company> {
  /**
   * Find company by slug.
   */
  public async findBySlug(
    slug: string,
    ignoreId = '',
  ): Promise<Company | undefined> {
    const company = await this.findOne({
      where: { slug, id: Not(ignoreId) },
    });

    return company;
  }
}

export default CompanyRepository;
