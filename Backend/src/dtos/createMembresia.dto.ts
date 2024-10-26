import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { EstadoMembresia } from 'src/enums/estadoMembresia.enum';

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

  @ApiProperty({
    description: 'Fecha de inicio de la membresía',
    type: 'string',
    format: 'date',
    nullable: true,
  })
  @IsOptional()
  startDate?: Date;

  @ApiProperty({
    description: 'Fecha de fin de la membresía',
    type: 'string',
    format: 'date',
    nullable: true,
  })
  @IsOptional()
  endDate?: Date;

  @ApiProperty({
    description: 'Estado de la membresía',
    enum: EstadoMembresia,
    nullable: true,
  })
  @IsOptional()
  status: EstadoMembresia;
}
