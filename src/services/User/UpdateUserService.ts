import { getCustomRepository } from 'typeorm';
import httpCode from 'http-status-codes';
import { hash } from 'bcryptjs';

import User from '../../models/User';

import UserRepository from '../../repositories/UserRepository';

import ShowUserService from './ShowUserService';
import RemoveFileService from '../File/RemoveFileService';

import AppError from '../../errors/AppError';

interface Request {
  id: string;
  name: string;
  last_name: string;
  email: string;
  password: string;
  avatar: string;
}

class UpdateUserService {
  protected userRepository: UserRepository;

  protected showUser: ShowUserService;

  protected removeFile: RemoveFileService;

  constructor() {
    this.userRepository = getCustomRepository(UserRepository);
    this.showUser = new ShowUserService();
    this.removeFile = new RemoveFileService();
  }

  public async execute({
    id,
    name,
    last_name,
    email,
    password,
    avatar,
  }: Request): Promise<User> {
    let user = await this.showUser.execute(id);

    const hasUserEmail = await this.userRepository.findByEmail(email, id);

    if (hasUserEmail) {
      throw new AppError(
        'Este e-mail já extá sendo utilizado por outro usuário.',
        httpCode.CONFLICT,
      );
    }

    if (avatar) {
      await this.removeFile.execute(user.avatar);
    }

    let hashedPassword = user.password;

    if (password) {
      hashedPassword = await hash(password, 8);
    }

    const updateUser = {
      name,
      last_name,
      email,
      password: hashedPassword,
      avatar,
    };

    await this.userRepository.update(id, updateUser);

    user = { ...user, ...updateUser };

    delete user.password;

    return user;
  }
}

export default UpdateUserService;
