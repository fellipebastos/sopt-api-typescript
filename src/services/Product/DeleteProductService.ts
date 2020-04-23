import { getCustomRepository } from 'typeorm';

import ProductRepository from '../../repositories/ProductRepository';

import ShowProductService from './ShowProductService';

interface Request {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: Request): Promise<void> {
    const productRepository = getCustomRepository(ProductRepository);

    const showProduct = new ShowProductService();

    await showProduct.execute({ id });

    await productRepository.delete(id);
  }
}

export default DeleteProductService;
