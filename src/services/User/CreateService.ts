import httpCode from 'http-status-codes';
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../../models/User';

import UserRepository from '../../repositories/UserRepository';

import AppError from '../../errors/AppError';

interface Request {
  name: string;
  last_name: string;
  email: string;
  password: string;
  avatar: string;
}

class CreateUserService {
  protected userRepository: UserRepository;

  constructor() {
    this.userRepository = getCustomRepository(UserRepository);
  }

  public async execute({
    name,
    last_name,
    email,
    password,
    avatar,
  }: Request): Promise<User | undefined> {
    const hasUser = await this.userRepository.findByEmail(email);

    if (hasUser) {
      throw new AppError(
        'Este e-mail já extá sendo utilizado por outro usuário.',
        httpCode.CONFLICT,
      );
    }

    const hashedPassword = await hash(password, 8);

    const user = this.userRepository.create({
      name,
      last_name,
      email,
      password: hashedPassword,
      avatar,
    });

    await this.userRepository.save(user);

    const createdUser = await this.userRepository.findOne(user.id);

    if (createdUser) {
      delete createdUser.password;
    }

    return createdUser;
  }
}

export default CreateUserService;
