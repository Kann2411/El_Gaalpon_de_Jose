import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { LoginUserDto } from 'src/dtos/loginUser.dto';
import { GoogleOauthGuard } from 'src/guards/googleOauthGuard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async googleAuth(@Req() req) {
    // Inicia la autenticación con Google
  }

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Req() req) {
    console.log('Perfil recibido en el controlador:', req.user);
    return await this.authService.validateOAuthLogin(req.user);
  }

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

  @Post('signin')
  signIn(@Body() credentials: LoginUserDto) {
    const { email, password } = credentials;
    return this.authService.signIn(email, password);
  }
}
