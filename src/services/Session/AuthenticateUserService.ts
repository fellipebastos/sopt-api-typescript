import { getCustomRepository } from 'typeorm';
import httpCode from 'http-status-codes';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../../config/auth';

import AppError from '../../errors/AppError';

import UserRepository from '../../repositories/UserRepository';

import User from '../../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  protected userRepository: UserRepository;

  constructor() {
    this.userRepository = getCustomRepository(UserRepository);
  }

  public async execute({ email, password }: Request): Promise<Response> {
    let passwordMatched = false;
    const user = await this.userRepository.findByEmail(email);

    if (user) {
      passwordMatched = await compare(password, user.password);
    }

    if (!user || !passwordMatched) {
      throw new AppError('Credenciais incorretas.', httpCode.UNAUTHORIZED);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
