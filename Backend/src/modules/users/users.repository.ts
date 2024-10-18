import {
  BadRequestException,
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

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    try {
      const [users] = await this.userRepository.findAndCount({
        select: ['id', 'name', 'dni', 'email', 'phone', 'role'],
      });
      return users;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener los usuarios');
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
        },
      });

      if (!user) {
        throw new NotFoundException(`Usuario con id ${id} no existe`);
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error al obtener el usuario por ID',
      );
    }
  }
  async patchUser(id, role) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Usuario con nombre ${id} no existe`);
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
        throw new NotFoundException(`Usuario con id ${id} no existe.`);
      }
      user.imgUrl = secureUrl;
      await this.userRepository.save(user);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error al actualizar la imagen del producto.',
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
      throw new InternalServerErrorException('Error al crear el usuario');
    }
  }

  async updateUser(id: string, updateUserDto: CreateUserDto): Promise<string> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException(`Usuario con id ${id} no existe`);
      }

      if (updateUserDto.password) {
        const passwordMatches = await bcrypt.compare(
          updateUserDto.password,
          user.password,
        );

        if (!passwordMatches) {
          if (updateUserDto.password !== updateUserDto.confirmPassword) {
            throw new BadRequestException('Las contraseñas no coinciden');
          }

          const salt = await bcrypt.genSalt(10);
          updateUserDto.password = await bcrypt.hash(
            updateUserDto.password,
            salt,
          );
        } else {
          delete updateUserDto.password;
        }
        delete updateUserDto.confirmPassword;
      }

      this.userRepository.merge(user, updateUserDto);
      await this.userRepository.save(user);
      return id;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al actualizar el usuario');
    }
  }

  async deleteUser(id: string): Promise<string> {
    try {
      const result = await this.userRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Usuario con id ${id} no existe`);
      }
      return id;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al eliminar el usuario');
    }
  }
}
