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
        select: ['id', 'name', 'dni', 'email', 'phone', 'role'],
      });
      return users;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener los usuarios');
    }
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
        throw new NotFoundException(`Usuario con id ${id} no existe`);
      }

      return user.imgUrl;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error al obtener el usuario por ID',
      );
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

  async updateProfile(
    id: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException(`Usuario con id ${id} no existe`);
      }
      this.userRepository.merge(user, updateProfileDto);
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al actualizar el perfil');
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
        throw new NotFoundException(`Usuario con id ${id} no existe`);
      }

      const passwordMatches = await bcrypt.compare(
        currentPassword,
        user.password,
      );
      if (!passwordMatches) {
        throw new BadRequestException('La contraseña actual es incorrecta.');
      }

      if (newPassword !== confirmPassword) {
        throw new BadRequestException(
          'La nueva contraseña y la confirmación no coinciden.',
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
        throw error;
      }
      throw new InternalServerErrorException('Error al cambiar la contraseña');
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
        throw new NotFoundException(`Usuario con id ${id} no existe`);
      }

      if (newPassword !== confirmPassword) {
        throw new BadRequestException(
          'La nueva contraseña y la confirmación no coinciden.',
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
        throw error;
      }
      throw new InternalServerErrorException(
        'Error al establecer la contraseña',
      );
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
        throw new NotFoundException('Usuario no encontrado');
      }

      const { newPassword, confirmPassword } = setPasswordDto;
      if (newPassword !== confirmPassword) {
        throw new BadRequestException('Las contraseñas no coinciden.');
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);

      await this.userRepository.save(user);
      return 'Contraseña restablecida con éxito';
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new BadRequestException(
          'El enlace ha expirado. Solicita uno nuevo.',
        );
      }
      throw new BadRequestException('El enlace no es válido.');
    }
  }

  async toggleBanUser(id: string, isBanned: boolean): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    user.isBanned = isBanned;
    return this.userRepository.save(user);
  }
}
