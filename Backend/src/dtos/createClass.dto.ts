import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
  Matches,
  IsEmpty,
} from 'class-validator';
import { EstadoClase } from 'src/enums/estadoClase.enum';
import { User } from 'src/modules/users/users.entity';

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
  @Max(20)
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

  @ApiProperty({ description: 'Día de la clase', example: 'Lunes' })
  @IsString()
  @IsNotEmpty()
  day: string;

  @ApiProperty({
    description: 'Hora de inicio de la clase',
    example: '08:00',
  })
  @Matches(/^\d{2}:\d{2}$/, { message: 'starttime must be in HH:mm format' })
  @IsNotEmpty()
  starttime: string;

  @ApiProperty({
    description: 'Hora de finalización de la clase',
    example: '09:00',
  })
  @Matches(/^\d{2}:\d{2}$/, { message: 'endtime must be in HH:mm format' })
  @IsNotEmpty()
  endtime: string;

  @IsEmpty()
  coach: User;
}
