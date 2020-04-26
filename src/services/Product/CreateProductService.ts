import { getCustomRepository } from 'typeorm';
import httpCode from 'http-status-codes';

import AppError from '../../errors/AppError';

import ProductRepository from '../../repositories/ProductRepository';

import Product from '../../models/Product';

interface Request {
  code: string;
  description: string;
  value: number;
  company_id: string;
}

class CreateProductService {
  public async execute({
    code,
    description,
    value,
    company_id,
  }: Request): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);

    const foundProduct = await productRepository.findByCode(code, company_id);

    if (foundProduct) {
      throw new AppError(
        'Este código já está sendo utilizado por outro produto dessa indústria.',
        httpCode.CONFLICT,
      );
    }

    const product = productRepository.create({
      code,
      description,
      value,
      company_id,
    });

    await productRepository.save(product);

    return product;
  }
}

export default CreateProductService;
