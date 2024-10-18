import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDate, IsNumber } from 'class-validator';

export class CreateTrainingDto {
  @ApiProperty({
    description: 'Fecha del entrenamiento',
    type: 'string',
    format: 'date-time',
  })
  @IsDate()
  date: Date;

  @ApiProperty({
    description: 'Duración del entrenamiento en horas',
    type: 'number',
  })
  @IsNumber()
  duration: number;

  @ApiProperty({
    description: 'Progreso del entrenamiento en texto',
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  progress: string;
}
