import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from '../../dtos/createUser.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  getUsers() {
    return this.usersRepository.getUsers();
  }

  getUserById(id: string) {
    return this.usersRepository.getUserById(id);
  }

  patchUser(id: string, role: string) {
    return this.usersRepository.patchUser(id, role);
  }

  updateUser(id: string, updateUserDto: CreateUserDto) {
    return this.usersRepository.updateUser(id, updateUserDto);
  }

  delete(id: string) {
    return this.usersRepository.deleteUser(id);
  }
}
