import { getCustomRepository } from 'typeorm';
import httpCode from 'http-status-codes';

import AppError from '../../errors/AppError';

import ProductRepository from '../../repositories/ProductRepository';

import Product from '../../models/Product';

interface Request {
  id: string;
  code: string;
  description: string;
  value: number;
  company_id: string;
}

class UpdateProductService {
  public async execute({
    id,
    code,
    description,
    value,
    company_id,
  }: Request): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);

    const updateProduct = await productRepository.preload({
      id,
      code,
      description,
      value,
      company_id,
    });

    if (!updateProduct) {
      throw new AppError('Produto não encontrado.', httpCode.NOT_FOUND);
    }

    const productExists = await productRepository.findByCode(
      code,
      company_id,
      id,
    );

    if (productExists || !updateProduct) {
      throw new AppError(
        'Este código já está sendo utilizado por outro produto dessa indústria.',
        httpCode.CONFLICT,
      );
    }

    const product = await productRepository.save(updateProduct);

    return product;
  }
}

export default UpdateProductService;
