import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { LoginUserDto } from 'src/dtos/loginUser.dto';
import { GoogleOauthGuard } from 'src/guards/googleOauthGuard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Inicia el flujo OAuth con Google
  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async googleAuth(@Req() req) {
    // Esta ruta será interceptada por el guard, no es necesario implementar nada aquí.
  }

  // Callback después de la autenticación con Google
  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    console.log('Perfil recibido en el controlador:', req.user);
    const jwtToken = await this.authService.validateOAuthLogin(req.user);

    // Redirecciona al frontend con el token JWT como parámetro
    res.redirect(`http://localhost:3001?token=${jwtToken}`);
  async googleAuthRedirect(@Req() req) {
    if (req.user?.token) {
      return req.user;
    }
    return await this.authService.validateOAuthLogin(req.user);
  }

  // Registro de usuarios
  @Post('signup')
  async signUp(@Body() signUpDto: CreateUserDto) {
    const { password, confirmPassword } = signUpDto;
    if (password !== confirmPassword) {
      throw new BadRequestException('Las contraseñas no coinciden.');
    }
    const newUser = await this.authService.signUp(signUpDto);
    const { password: _, ...userWithoutPassword } = newUser;
    return { user: userWithoutPassword };
  }

  // Inicio de sesión de usuarios
  @Post('signin')
  signIn(@Body() credentials: LoginUserDto) {
    const { email, password } = credentials;
    return this.authService.signIn(email, password);
  }
}
