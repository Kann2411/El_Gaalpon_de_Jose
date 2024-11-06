import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../dtos/createUser.dto';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/enums/role.enum';
import { UpdateProfileDto } from 'src/dtos/updateProfile.dto';
import { ChangePasswordDto } from 'src/dtos/changePassword.dto';
import { SetPasswordDto } from 'src/dtos/setPassword.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async getUsers(): Promise<User[]> {
    try {
      const [users] = await this.userRepository.findAndCount({
        select: [
          'id',
          'name',
          'dni',
          'email',
          'phone',
          'role',
          'estadoMembresia',
          'membership',
          'registrationMethod',
        ],
      });
      return users;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException('Error getting users', HttpStatus.BAD_REQUEST);
    }
  }

  async getCoaches() {
    return await this.userRepository.find({ where: { role: Role.Coach } });
  }

  async getUserByIdImag(id: string): Promise<string> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        select: {
          imgUrl: true,
        },
      });

      if (!user) {
        throw new HttpException(
          `Usuario con id ${id} no existe`,
          HttpStatus.NOT_FOUND,
        );
      }

      return user.imgUrl;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Error getting user by id', HttpStatus.NOT_FOUND);
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        select: {
          id: true,
          name: true,
          dni: true,
          email: true,
          phone: true,
          registrationMethod: true,
          membership: true,
          estadoMembresia: true,
        },
      });

      if (!user) {
        throw new HttpException(
          `Usuario con id ${id} no existe`,
          HttpStatus.NOT_FOUND,
        );
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Error getting user by id', HttpStatus.NOT_FOUND);
    }
  }
  async patchUser(id, role) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException(
        `User with ${id} not exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    if (role === 'admin') {
      user.role = Role.Admin;
    }
    if (role === 'coach') {
      user.role = Role.Coach;
    }
    if (role === 'user') {
      user.role = Role.User;
    }
    await this.userRepository.save(user);
    return { message: `Rol de ${user.name} cambiado a ${user.role}` };
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async updateUserImage(id: string, secureUrl: string): Promise<void> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: id },
      });
      if (!user) {
        throw new HttpException(
          `User with ${id} not exist`,
          HttpStatus.NOT_FOUND,
        );
      }
      user.imgUrl = secureUrl;
      await this.userRepository.save(user);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Error updating product image',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = this.userRepository.create(createUserDto);

      if (createUserDto.password) {
        newUser.password = await bcrypt.hash(createUserDto.password, 10);
      }

      await this.userRepository.save(newUser);
      return newUser;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException('Error creating user', HttpStatus.BAD_REQUEST);
    }
  }

  async updateProfile(
    id: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new HttpException(
          `User with ${id} not exist`,
          HttpStatus.NOT_FOUND,
        );
      }
      this.userRepository.merge(user, updateProfileDto);
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Error updating profile', HttpStatus.BAD_REQUEST);
    }
  }

  async changePassword(
    id: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<string> {
    try {
      const { currentPassword, newPassword, confirmPassword } =
        changePasswordDto;

      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new HttpException(
          `User with ${id} not exist`,
          HttpStatus.NOT_FOUND,
        );
      }

      const passwordMatches = await bcrypt.compare(
        currentPassword,
        user.password,
      );
      if (!passwordMatches) {
        throw new HttpException(
          'The current password is incorrect',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (newPassword !== confirmPassword) {
        throw new HttpException(
          'New password and confirmation do not match',
          HttpStatus.BAD_REQUEST,
        );
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);

      await this.userRepository.save(user);
      return 'Contraseña actualizada con éxito';
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Error changing password',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async setPassword(
    id: string,
    setPasswordDto: SetPasswordDto,
  ): Promise<string> {
    try {
      const { newPassword, confirmPassword } = setPasswordDto;

      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new HttpException(
          `User with ${id} not exist`,
          HttpStatus.NOT_FOUND,
        );
      }

      if (newPassword !== confirmPassword) {
        throw new HttpException(
          'New password and confirmation do not match',
          HttpStatus.BAD_REQUEST,
        );
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);

      await this.userRepository.save(user);
      return 'Contraseña establecida con éxito';
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Error resetting password',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteUser(id: string): Promise<string> {
    try {
      const result = await this.userRepository.delete(id);
      if (result.affected === 0) {
        throw new HttpException(
          `User with id ${id} not exist`,
          HttpStatus.NOT_FOUND,
        );
      }
      return id;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Error deleting user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async resetPassword(
    token: string,
    setPasswordDto: SetPasswordDto,
  ): Promise<string> {
    try {
      // Verificar el token
      const decoded = this.jwtService.verify(token);
      const user = await this.userRepository.findOne({
        where: { id: decoded.id },
      });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const { newPassword, confirmPassword } = setPasswordDto;
      if (newPassword !== confirmPassword) {
        throw new HttpException(
          'Passwords do not match',
          HttpStatus.BAD_REQUEST,
        );
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);

      await this.userRepository.save(user);
      return 'Contraseña restablecida con éxito';
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new HttpException(
          'The link has expired. Request a new one.',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException('The link is invalid', HttpStatus.BAD_REQUEST);
    }
  }

  async toggleBanUser(id: string, isBanned: boolean): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    user.isBanned = isBanned;
    return this.userRepository.save(user);
  }
}
