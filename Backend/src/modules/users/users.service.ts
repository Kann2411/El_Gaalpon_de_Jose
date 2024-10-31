import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UpdateProfileDto } from 'src/dtos/updateProfile.dto';
import { ChangePasswordDto } from 'src/dtos/changePassword.dto';
import { SetPasswordDto } from 'src/dtos/setPassword.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  getUsers() {
    return this.usersRepository.getUsers();
  }

  getCoaches() {
    return this.usersRepository.getCoaches();
  }

  getUserByIdImag(id: string) {
    return this.usersRepository.getUserByIdImag(id);
  }

  getUserById(id: string) {
    return this.usersRepository.getUserById(id);
  }

  patchUser(id: string, role: string) {
    return this.usersRepository.patchUser(id, role);
  }

  updateProfile(id: string, updateProfileDto: UpdateProfileDto) {
    return this.usersRepository.updateProfile(id, updateProfileDto);
  }

  changePassword(id: string, changePasswordDto: ChangePasswordDto) {
    return this.usersRepository.changePassword(id, changePasswordDto);
  }

  setPassword(id: string, setPasswordDto: SetPasswordDto) {
    return this.usersRepository.setPassword(id, setPasswordDto);
  }

  toggleUserBan(id: string, isBanned: boolean) {
    return this.usersRepository.toggleBanUser(id, isBanned);
  }
}
