import { EntityRepository, Repository, Not } from 'typeorm';

import User from '../models/User';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  /**
   * Find user by email.
   */
  public async findByEmail(
    email: string,
    ignoreId = null as string | null,
  ): Promise<User | undefined> {
    const user = await this.findOne({ where: { email, id: Not(ignoreId) } });

    return user;
  }
}

export default UserRepository;
