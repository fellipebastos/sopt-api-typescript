/* eslint-disable no-param-reassign */
import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import httpCode from 'http-status-codes';
import multer from 'multer';
import uploadConfig from '../config/upload';

import UserRepository from '../repositories/UserRepository';

import CreateUserService from '../services/User/CreateUserService';
import UpdateUserService from '../services/User/UpdateUserService';
import ShowUserService from '../services/User/ShowUserService';
import DeleteUserService from '../services/User/DeleteUserService';

const usersRouter = Router();

const uploadFile = multer(
  uploadConfig.upload(uploadConfig.directories.users),
).single('avatar');

usersRouter.get('/', async (request, response) => {
  const userRepository = getCustomRepository(UserRepository);

  const users = await userRepository.find();

  users.forEach(user => delete user.password);

  return response.json(users);
});

usersRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const showUser = new ShowUserService();

  const user = await showUser.execute(id);

  delete user.password;

  return response.json(user);
});

usersRouter.post('/', uploadFile, async (request, response) => {
  const { name, last_name, email, password } = request.body;
  const { filename } = request.file;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    last_name,
    email,
    password,
    avatar: filename,
  });

  return response.json(user);
});

usersRouter.put('/:id', uploadFile, async (request, response) => {
  const { id } = request.params;
  const { name, last_name, email, password } = request.body;
  const { filename } = request.file;

  const updateUser = new UpdateUserService();

  const user = await updateUser.execute({
    id,
    name,
    last_name,
    email,
    password,
    avatar: filename,
  });

  return response.json(user);
});

usersRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteUser = new DeleteUserService();

  await deleteUser.execute(id);

  return response.status(httpCode.NO_CONTENT).send();
});

export default usersRouter;
