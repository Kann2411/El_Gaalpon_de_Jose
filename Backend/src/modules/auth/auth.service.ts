import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { SetPasswordDto } from 'src/dtos/setPassword.dto';
import { RegistrationMethod } from 'src/enums/registrationMethod';
import { Role } from 'src/enums/role.enum';
import { User } from 'src/modules/users/users.entity';
import { UsersRepository } from 'src/modules/users/users.repository';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
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
        dni: '',
        phone: '',
        registrationMethod: RegistrationMethod.Google,
        role: Role.User,
        confirmPassword: '',
      });
    }

    if (user.isBanned) {
      throw new BadRequestException('Tu cuenta ha sido baneada.');
    }

    const payload = { id: user.id, email: user.email, role: user.role };
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

    if (user.isBanned) {
      throw new BadRequestException('Tu cuenta ha sido baneada.');
    }

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

  async sendPasswordResetEmail(email: string): Promise<string> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

 
    const token = this.jwtService.sign(  { id: user.id },
      { expiresIn: '1h' });

      console.log(`Generated reset token: ${token}`);


    const resetLink = `http://localhost:3001/auth/reset-password?token=${token}`;
    const htmlContent = `
      <h1>Restablecimiento de contraseña</h1>
      <p>Hola, ${user.name}!</p>
      <p>Hiciste una solicitud para restablecer tu contraseña. Haz clic en el enlace a continuación para restablecerla:</p>
      <a href="${resetLink}">Restablecer contraseña</a>
      <p>Si no solicitaste este cambio, ignora este correo.</p>
    `;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Restablecimiento de contraseña',
      html: htmlContent, 
    });

    return 'Correo de recuperación enviado con éxito';
  }

  resetPassword(token: string, setPasswordDto: SetPasswordDto) {
   return this.usersRepository.resetPassword(token,setPasswordDto)
  }
}
