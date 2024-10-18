import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  Length,
  Matches,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { Role } from '../enums/role.enum';
import { RegistrationMethod } from 'src/enums/registrationMethod';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nombre del usuario',
    type: 'string',
    minLength: 3,
    maxLength: 80,
    example: 'Juan Cordoba'
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido.' })
  @Length(3, 80, { message: 'El nombre debe tener entre 3 y 80 caracteres.' })
  name: string;

  @ApiProperty({
    description: 'DNI del usuario',
    type: 'string',
    minLength: 3,
    maxLength: 10,
    example: '12345678'
  })
  @IsString()
  @IsNotEmpty({ message: 'El dni es requerido.' })
  @Length(3, 10, { message: 'El DNI debe tener entre 3 y 10 caracteres.' })
  dni: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    type: 'string',
    example: 'example@gmail.com'
  })
  @IsEmail({}, { message: 'El correo debe tener un formato válido.' })
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    type: 'string',
    example: 'cOnt12#trase'
  })
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
    message:
      'La contraseña debe tener entre 8 y 15 caracteres, al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (!@#$%^&*).',
  })
  password: string;

  @ApiProperty({
    description: 'Confirmación de la contraseña',
    type: 'string',
    example: 'cOnt12#trase'
  })
  @IsString()
  @IsNotEmpty({ message: 'La confirmación de la contraseña es requerida.' })
  confirmPassword: string;

  @ApiProperty({
    description: 'Número de teléfono del usuario',
    type: 'string',
    example: '123456789'
  })
  @IsString()
  @IsNotEmpty({ message: 'El número de teléfono es requerido.' })
  phone: string;

  @ApiProperty({
    description: 'Rol del usuario en el sistema',
    enum: Role,
    required: false,
    example: Role.User,
  })
  @IsOptional()
  role?: Role;

  @ApiProperty({
    description: 'Método de registro del usuario',
    enum: RegistrationMethod,
    required: false,
    example: RegistrationMethod.Form,
  })
  @IsOptional()
  registrationMethod?: RegistrationMethod;
}
