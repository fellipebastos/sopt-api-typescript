/* eslint-disable no-param-reassign */
import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import httpCode from 'http-status-codes';

import ProductRepository from '../repositories/ProductRepository';

import CreateProductService from '../services/Product/CreateService';
import UpdateProductService from '../services/Product/UpdateService';
import ShowProductService from '../services/Product/ShowService';
import DeleteProductService from '../services/Product/DeleteService';

const productsRouter = Router({ mergeParams: true });

productsRouter.get('/', async (request, response) => {
  const { id: company_id } = request.params;

  const productRepository = getCustomRepository(ProductRepository);

  const products = await productRepository.findByCompany(company_id);

  return response.json(products);
});

productsRouter.get('/:product_id', async (request, response) => {
  const { id: company_id, product_id } = request.params;

  const showProduct = new ShowProductService();

  const product = await showProduct.execute({ id: product_id, company_id });

  return response.json(product);
});

productsRouter.post('/', async (request, response) => {
  const { code, description, value } = request.body;
  const { id: company_id } = request.params;

  const createProduct = new CreateProductService();

  const product = await createProduct.execute({
    code,
    description,
    value,
    company_id,
  });

  return response.json(product);
});

productsRouter.put('/:product_id', async (request, response) => {
  const { id: company_id, product_id } = request.params;
  const { code, description, value } = request.body;

  const updateProduct = new UpdateProductService();

  const product = await updateProduct.execute({
    id: product_id,
    code,
    description,
    value,
    company_id,
  });

  return response.json(product);
});

productsRouter.delete('/:product_id', async (request, response) => {
  const { id: company_id, product_id } = request.params;

  const deleteProduct = new DeleteProductService();

  await deleteProduct.execute({ id: product_id, company_id });

  return response.status(httpCode.NO_CONTENT).send();
});

export default productsRouter;
