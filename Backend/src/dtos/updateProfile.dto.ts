import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class UpdateProfileDto {
    @ApiProperty({
      description: 'Nombre del usuario',
      type: 'string',
      minLength: 3,
      maxLength: 80,
      example: 'Juan Cordoba',
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
      example: '12345678',
    })
    @IsString()
    @IsNotEmpty({ message: 'El DNI es requerido.' })
    @Length(3, 10, { message: 'El DNI debe tener entre 3 y 10 caracteres.' })
    dni: string;
  
    @ApiProperty({
      description: 'Correo electrónico del usuario',
      type: 'string',
      example: 'example@gmail.com',
    })
    @IsEmail({}, { message: 'El correo debe tener un formato válido.' })
    email: string;
  
    @ApiProperty({
      description: 'Número de teléfono del usuario',
      type: 'string',
      example: '123456789',
    })
    @IsString()
    @IsNotEmpty({ message: 'El número de teléfono es requerido.' })
    phone: string;
  }
  