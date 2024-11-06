import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class MembresiaDto {
  @ApiProperty({ description: 'Tipo de membresía' })
  @IsString()
  plan: string;

  @ApiProperty({
    description: 'Precio de la membresía',
    type: 'decimal',
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Moneda del plan',
    type: 'string',
  })
  @IsString()
  currency: string;

  @ApiProperty({
    description: 'Descripción del plan',
    type: 'string',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Beneficios de la membresía',
  })
  @IsArray()
  benefits: string[];

  @IsString()
  idealFor: string;
}
