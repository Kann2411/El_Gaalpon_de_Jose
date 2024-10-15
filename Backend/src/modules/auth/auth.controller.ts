import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/modules/dtos/createUser.dto';
import { LoginUserDto } from 'src/modules/dtos/loginUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
