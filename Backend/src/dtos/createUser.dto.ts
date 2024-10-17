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
  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido.' })
  @Length(3, 80, { message: 'El nombre debe tener entre 3 y 80 caracteres.' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'El dni es requerido.' })
  @Length(3, 10, { message: 'El nombre debe tener entre 3 y 80 caracteres.' })
  dni: string;

  @IsEmail({}, { message: 'El correo debe tener un formato válido.' })
  email: string;

  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
    message:
      'La contraseña debe tener entre 8 y 15 caracteres, al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (!@#$%^&*).',
  })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'La confirmación de la contraseña es requerida.' })
  confirmPassword: string;

  @IsString()
  @IsNotEmpty({ message: 'El número de teléfono es requerido.' })
  phone: string;

  @IsOptional()
  role?: Role;

  @IsOptional()
  registrationMethod?: RegistrationMethod;
}
