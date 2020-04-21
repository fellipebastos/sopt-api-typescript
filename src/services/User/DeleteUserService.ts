import { getCustomRepository } from 'typeorm';
import fs from 'fs';
import path from 'path';

import User from '../../models/User';

import UserRepository from '../../repositories/UserRepository';

import ShowUserService from './ShowUserService';
import UpdateUserService from './UpdateUserService';
import RemoveFileService from '../File/RemoveFileService';

class DeleteUserService {
  protected userRepository: UserRepository;

  protected showUser: ShowUserService;

  protected updateUser: UpdateUserService;

  protected removeFile: RemoveFileService;

  constructor() {
    this.userRepository = getCustomRepository(UserRepository);
    this.showUser = new ShowUserService();
    this.updateUser = new UpdateUserService();
    this.removeFile = new RemoveFileService();
  }

  public async execute(id: string): Promise<User> {
    const user = await this.showUser.execute(id);

    if (user.avatar) {
      await this.removeFile.execute(user.avatar);
    }

    const updateUser = {
      ...user,
      email: `${Date.now()}_${user.email}`,
      avatar: '',
    };

    await this.updateUser.execute(updateUser);

    await this.userRepository.softDelete(user.id);

    return user;
  }
}

export default DeleteUserService;