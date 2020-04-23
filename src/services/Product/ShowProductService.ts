import { getCustomRepository } from 'typeorm';
import httpCode from 'http-status-codes';

import AppError from '../../errors/AppError';

import ProductRepository from '../../repositories/ProductRepository';

import Product from '../../models/Product';

interface Request {
  id: string;
}

class ShowProductService {
  public async execute({ id }: Request): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    if (!product) {
      throw new AppError('Produto não encontrado.', httpCode.NOT_FOUND);
    }

    return product;
  }
}

export default ShowProductService;
