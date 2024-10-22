import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Contraseña actual del usuario',
    type: 'string',
    example: 'OldPassw0rd!',
  })
  @IsString()
  @IsNotEmpty({ message: 'La contraseña actual es requerida.' })
  currentPassword: string;

  @ApiProperty({
    description: 'Nueva contraseña del usuario',
    type: 'string',
    example: 'NewPassw0rd!',
  })
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
    message:
      'La nueva contraseña debe tener entre 8 y 15 caracteres, al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (!@#$%^&*).',
  })
  newPassword: string;

  @ApiProperty({
    description: 'Confirmación de la nueva contraseña',
    type: 'string',
    example: 'NewPassw0rd!',
  })
  @IsString()
  @IsNotEmpty({
    message: 'La confirmación de la nueva contraseña es requerida.',
  })
  confirmPassword: string;
}
