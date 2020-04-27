import { getCustomRepository } from 'typeorm';
import httpCode from 'http-status-codes';

import User from '../../models/User';

import UserRepository from '../../repositories/UserRepository';

import AppError from '../../errors/AppError';

class ShowUserService {
  protected userRepository: UserRepository;

  constructor() {
    this.userRepository = getCustomRepository(UserRepository);
  }

  public async execute(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new AppError('Usuário não encontrado.', httpCode.NOT_FOUND);
    }

    return user;
  }
}

export default ShowUserService;
