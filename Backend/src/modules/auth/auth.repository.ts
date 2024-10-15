import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class AuthRepository {
  constructor(private usersRepository: UsersRepository) {}

  async signin(email: string, password: string): Promise<boolean> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      return false;
    }

    if (user.password !== password) {
      return false;
    }

    return true;
  }
}
