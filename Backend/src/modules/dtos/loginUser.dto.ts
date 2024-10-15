import { IsString, IsNotEmpty } from 'class-validator';

export class LoginUserDto {

  @IsString()
  @IsNotEmpty({ message: 'El email es requerido.' })
  email: string;


  @IsString()
  @IsNotEmpty({ message: 'La contraseña es requerida.' })
  password: string;
}
