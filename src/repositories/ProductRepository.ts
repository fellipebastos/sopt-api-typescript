import { EntityRepository, Repository, Not } from 'typeorm';

import Product from '../models/Product';

@EntityRepository(Product)
class ProductRepository extends Repository<Product> {
  /**
   * Find product by code.
   */
  public async findByCode(
    code: string,
    ignoreId = '',
  ): Promise<Product | undefined> {
    const product = await this.findOne({
      where: { code, id: Not(ignoreId) },
    });

    return product;
  }
}

export default ProductRepository;
