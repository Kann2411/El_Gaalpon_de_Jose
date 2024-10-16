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
    console.log('Datos del perfil recibido:', profile);

    const email = profile?.emails?.[0]?.value || profile?.email; // Asegúrate de que estás accediendo correctamente al correo
    if (!email) {
        console.error('Error: No se pudo obtener un correo electrónico del perfil.');
        throw new Error('No se pudo obtener un correo electrónico del perfil.');
    }

    const displayName = profile?.displayName || 'Sin nombre';
    const name = displayName || `${profile?.name?.givenName || ''} ${profile?.name?.familyName || ''}`.trim();

    if (!name) {
        console.error('Error: El nombre del usuario es vacío o no válido.');
        throw new Error('El nombre del usuario es vacío o no válido.');
    }

    console.log(`Buscando usuario con email: ${email}`);

    let user = await this.usersRepository.findByEmail(email);

    if (!user) {
        console.log(`Usuario no encontrado. Creando usuario: ${name}`);
        user = await this.usersRepository.createUser({
            email,
            name,
            password: '', // O el valor que desees
            dni: '0000000',
            phone: null,
            registrationMethod: RegistrationMethod.Google,
            role: Role.User,
            confirmPassword: ''
        });

        if (!user) {
            throw new Error('El usuario no pudo ser creado.');
        }
    } else {
        console.log(`Usuario encontrado: ${user.name}`);
    }

    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
    console.log('Token generado:', token);
    return { token };
}





  async signUp(signUpDto: CreateUserDto): Promise<Omit<User, 'role'>> {
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
    
    const { role, ...userWithoutRole } = newUser;
  
    return userWithoutRole;
  }
  

  async signIn(email: string, password: string) {
    if (!email || !password) return 'email y password requeridos';

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
