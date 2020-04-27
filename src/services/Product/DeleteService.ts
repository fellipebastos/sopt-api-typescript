import { getCustomRepository } from 'typeorm';

import ProductRepository from '../../repositories/ProductRepository';

import ShowProductService from './ShowService';

interface Request {
  id: string;
  company_id: string;
}

class DeleteProductService {
  public async execute({ id, company_id }: Request): Promise<void> {
    const productRepository = getCustomRepository(ProductRepository);

    const showProduct = new ShowProductService();

    await showProduct.execute({ id, company_id });

    await productRepository.delete(id);
  }
}

export default DeleteProductService;
