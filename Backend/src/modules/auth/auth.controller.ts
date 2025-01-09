import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { LoginUserDto } from 'src/dtos/loginUser.dto';
import { GoogleOauthGuard } from 'src/guards/googleOauthGuard';
import { ApiTags } from '@nestjs/swagger';
import { SetPasswordDto } from 'src/dtos/setPassword.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleLoginCallback(@Req() req, @Res() res) {
    const tokenData = await this.authService.validateOAuthLogin(req.user);
    console.log(
      'Redirecting to: ',
      `https://el-gaalpon-de-jose.vercel.app/boton-prueba?token=${tokenData.token}`,
    );
    return res.redirect(
      `https://el-gaalpon-de-jose.vercel.app/boton-prueba?token=${tokenData.token}`,
    );
  }

  @Post('signup')
  async signUp(@Body() signUpDto: CreateUserDto) {
    const { password, confirmPassword } = signUpDto;
    if (password !== confirmPassword) {
      throw new BadRequestException('Las contraseñas no coinciden.');
    }
    const newUser = await this.authService.signUp(signUpDto);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = newUser;
    return { user: userWithoutPassword };
  }

  @Post('signin')
  signIn(@Body() credentials: LoginUserDto) {
    const { email, password } = credentials;
    return this.authService.signIn(email, password);
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    return this.authService.sendPasswordResetEmail(email);
  }

  @Put('reset-password')
  async resetPassword(
    @Query('token') token: string,
    @Body() setPasswordDto: SetPasswordDto,
  ) {
    return this.authService.resetPassword(token, setPasswordDto);
  }
}
