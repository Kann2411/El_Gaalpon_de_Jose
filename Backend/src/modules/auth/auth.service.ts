import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { RegistrationMethod } from 'src/enums/registrationMethod';
import { Role } from 'src/enums/role.enum';
import { User } from 'src/modules/users/users.entity';
import { UsersRepository } from 'src/modules/users/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateOAuthLogin(profile: any): Promise<{ token: string }> {
    console.log('Hola, se ejecuto validateOuthLogin');
    if (profile?.token) {
      return { token: profile.token };
    }

    const email =
      profile?.emails?.[0]?.value || profile?.email || profile?._json?.email;

    if (!email) {
      throw new Error('No se pudo obtener un correo electrónico del perfil.');
    }

    const name =
      profile.displayName ||
      `${profile?.name?.givenName || ''} ${profile?.name?.familyName || ''}` ||
      'Sin Nombre';

    let user = await this.usersRepository.findByEmail(email);

    if (!user) {
      user = await this.usersRepository.createUser({
        email,
        name,
        password: '',
        dni: '0000000',
        phone: null,
        registrationMethod: RegistrationMethod.Google,
        role: Role.User,
        confirmPassword: '',
      });
    }

    const payload = { email: user.email, sub: user.id, role: user.role };
    const token = this.jwtService.sign(payload);

    return { token };
  }

  async signUp(signUpDto: CreateUserDto): Promise<Omit<User, 'role'>> {
    console.log('Hola, se ejecuto la funcion signUp');
    const { email, password } = signUpDto;

    const existingUser = await this.usersRepository.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('El correo electrónico ya está en uso.');
    }

    const newUserDto = {
      ...signUpDto,
      password,
    };

    const newUser = await this.usersRepository.createUser(newUserDto);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { role, ...userWithoutRole } = newUser;

    return userWithoutRole;
  }

  async signIn(email: string, password: string) {
    console.log('Se ejecuto el metodo Signin');
    if (!email || !password) {
      throw new BadRequestException('Email  y contraseña son requeridos.');
    }

    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new BadRequestException('credenciales invalidas');

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) throw new BadRequestException('credenciales invalidas');

    const payload = {
      id: user.id,
      email: user.email,
      roles: user.role,
    };

    const token = this.jwtService.sign(payload);
    return {
      message: 'login exitosamente',
      token,
    };
  }
}
