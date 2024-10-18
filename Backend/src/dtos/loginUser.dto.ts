import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'Correo electrónico del usuario',
    type: 'string',
    example: 'example@gmail.com',
  })
  @IsString()
  @IsNotEmpty({ message: 'El email es requerido.' })
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    type: 'string',
    example: 'cOnt12#trase',
  })
  @IsString()
  @IsNotEmpty({ message: 'La contraseña es requerida.' })
  password: string;
}
