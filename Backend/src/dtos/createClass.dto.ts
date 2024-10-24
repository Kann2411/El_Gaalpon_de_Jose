import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
  IsUUID,
} from 'class-validator';
import { EstadoClase } from 'src/enums/estadoClase.enum';

export class CreateClassDto {
  @ApiProperty({ description: 'Nombre de la clase', example: 'Yoga' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Intensidad de la clase', example: 'Alta' })
  @IsString()
  @IsNotEmpty()
  intensity: string;

  @ApiProperty({ description: 'Capacidad máxima de la clase', example: 20 })
  @IsInt()
  @Min(0)
  @Max(100)
  capacity: number;

  @ApiProperty({ description: 'Estado actual de la clase', enum: EstadoClase })
  @IsEnum(EstadoClase)
  status: EstadoClase;

  @ApiProperty({
    description: 'Imagen de la clase',
    example: 'yogaClass.jpg',
    default: 'defaultImage.webp',
  })
  @IsString()
  @IsOptional()
  image: string = 'defaultImage.webp';

  @ApiProperty({
    description: 'Descripción de la clase',
    example: 'Clase de yoga avanzada.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Duración de la clase en minutos',
    example: '60',
  })
  @IsString()
  @IsNotEmpty()
  duration: string;

  @ApiProperty({
    description: 'ID del horario asignado a la clase',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @IsUUID()
  scheduleId: string; // El ID del horario asociado, como referencia
}
