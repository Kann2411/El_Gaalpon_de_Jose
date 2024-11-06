import { MailerService } from '@nestjs-modules/mailer';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
      throw new HttpException("Cann't obtain Email profile", HttpStatus.BAD_REQUEST);
    }

    const name =
      profile.displayName ||
      `${profile?.name?.givenName || ''} ${profile?.name?.familyName || ''}` ||
      'Sin Nombre';

    const imgUrl = profile?._json?.picture;

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
        imgUrl,
        confirmPassword: '',
      });
    }

    if (user.isBanned) {
      throw new HttpException('Your account has been baned', HttpStatus.BAD_REQUEST);
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
      throw new HttpException('Email is already in use', HttpStatus.BAD_REQUEST);
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
      throw new HttpException('Email and password required', HttpStatus.BAD_REQUEST);
    }

    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);

    if (user.isBanned) {
      throw new HttpException('Your account has been baned', HttpStatus.UNAUTHORIZED);
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);

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
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const token = this.jwtService.sign({ id: user.id }, { expiresIn: '1h' });

    console.log(`Generated reset token: ${token}`);

    const resetLink = `https://el-gaalpon-de-jose.vercel.app/auth/reset-password?token=${token}`;
    const htmlContent = `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <h1 style="color: #4A90E2; text-align: center;">Restablecimiento de contraseña</h1>
      <p style="font-size: 16px; line-height: 1.6;">Hola, <strong>${user.name}</strong>!</p>
      <p style="font-size: 16px; line-height: 1.6;">
        Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para proceder:
      </p>
      <div style="text-align: center; margin: 20px 0;">
        <a href="${resetLink}" style="font-size: 16px; color: white; background-color: #4A90E2; padding: 10px 20px; text-decoration: none; border-radius: 4px;">
          Restablecer contraseña
        </a>
      </div>
      <p style="font-size: 14px; color: #555; line-height: 1.6;">
        Si no solicitaste este cambio, puedes ignorar este mensaje.
      </p>
      <p style="font-size: 14px; color: #999; text-align: center; margin-top: 30px;">
        &copy; ${new Date().getFullYear()} FitZone. Todos los derechos reservados.
      </p>
    </div>
  `;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Restablecimiento de contraseña',
      html: htmlContent,
    });

    return 'Correo de recuperación enviado con éxito';
  }

  resetPassword(token: string, setPasswordDto: SetPasswordDto) {
    return this.usersRepository.resetPassword(token, setPasswordDto);
  }
}
