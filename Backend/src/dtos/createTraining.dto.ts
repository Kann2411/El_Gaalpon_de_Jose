import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDate, IsNumber } from 'class-validator';

export class CreateTrainingDto {
  @ApiProperty({
    description: 'Fecha del entrenamiento',
    type: 'string',
  })
  @IsString()
  date: string;

  @ApiProperty({
    description: 'Duración del entrenamiento en horas',
    type: 'string',
  })
  @IsString()
  duration: string;

  @ApiProperty({
    description: 'Progreso del entrenamiento en texto',
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  progress: string;
}
