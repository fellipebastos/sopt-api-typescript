import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';

import Product from '../models/Product';

@EntityRepository(Product)
class ProductRepository extends Repository<Product> {
  /**
   * Where has company query.
   */
  private whereHasCompany(company_id: string): SelectQueryBuilder<Product> {
    return this.createQueryBuilder('product').where({ company_id });
  }

  /**
   * Find product by company id.
   */
  public async findByCompany(company_id: string): Promise<Product[]> {
    const products = await this.whereHasCompany(company_id)
      .orderBy('code', 'ASC')
      .getMany();

    return products;
  }

  /**
   * Find product by company id.
   */
  public async findOneByCompany(
    id: string,
    company_id: string,
  ): Promise<Product | undefined> {
    const product = await this.whereHasCompany(company_id)
      .andWhere('product.id = :id', { id })
      .getOne();

    return product;
  }

  /**
   * Find company product by code.
   */
  public async findByCode(
    code: string,
    company_id: string,
    ignore_id = '',
  ): Promise<Product | undefined> {
    const product = await this.whereHasCompany(company_id)
      .andWhere('code = :code', { code })
      .andWhere('id != :ignore_id', { ignore_id })
      .getOne();

    return product;
  }
}

export default ProductRepository;
