/* eslint-disable no-param-reassign */
import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import httpCode from 'http-status-codes';

import ProductRepository from '../repositories/ProductRepository';

import CreateProductService from '../services/Product/CreateProductService';
import UpdateProductService from '../services/Product/UpdateProductService';
import ShowProductService from '../services/Product/ShowProductService';
import DeleteProductService from '../services/Product/DeleteProductService';

const productsRouter = Router();

productsRouter.get('/', async (request, response) => {
  const productRepository = getCustomRepository(ProductRepository);

  const products = await productRepository.find({
    order: { code: 'ASC' },
  });

  return response.json(products);
});

productsRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const showUser = new ShowProductService();

  const user = await showUser.execute({ id });

  return response.json(user);
});

productsRouter.post('/', async (request, response) => {
  const { code, description, value, company_id } = request.body;

  const createProduct = new CreateProductService();

  const product = await createProduct.execute({
    code,
    description,
    value,
    company_id,
  });

  return response.json(product);
});

productsRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { code, description, value, company_id } = request.body;

  const updateProduct = new UpdateProductService();

  const product = await updateProduct.execute({
    id,
    code,
    description,
    value,
    company_id,
  });

  return response.json(product);
});

productsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteProduct = new DeleteProductService();

  await deleteProduct.execute({ id });

  return response.status(httpCode.NO_CONTENT).send();
});

export default productsRouter;
