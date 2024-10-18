import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

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
  @IsString()
  @IsNotEmpty()
  file: string;
}
