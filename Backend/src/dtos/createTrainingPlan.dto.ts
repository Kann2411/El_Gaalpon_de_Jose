import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTrainingPlanDto {
  @ApiProperty({
    description: 'Descripción del plan de entrenamiento',
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Archivo del plan de entrenamiento (ruta o nombre)',
    type: 'string',
  })
  @IsOptional()
  file?: string;
}
