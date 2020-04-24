import { EntityRepository, Repository, Not } from 'typeorm';

import Product from '../models/Product';

@EntityRepository(Product)
class ProductRepository extends Repository<Product> {
  /**
   * Find company product by code.
   */
  public async findByCodeAndCompany(
    code: string,
    company_id: string,
    ignoreId = '',
  ): Promise<Product | undefined> {
    const product = await this.findOne({
      where: { code, company_id, id: Not(ignoreId) },
    });

    return product;
  }

  /**
   * Find company product by id.
   */
  public async findByIdAndCompany(
    id: string,
    company_id: string,
  ): Promise<Product | undefined> {
    const product = await this.findOne({
      where: { id, company_id },
    });

    return product;
  }
}

export default ProductRepository;
