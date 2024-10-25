import { ApiProperty } from '@nestjs/swagger';
import { Dia } from 'src/enums/dia.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'horarios' })
export class Horario {
  @ApiProperty({
    description: 'Identificador único del horario',
    type: 'string',
    format: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Día de la semana',
    enum: Dia,
  })
  @Column({ unique: true })
  day: Dia;

  @ApiProperty({
    description: 'Hora de inicio del horario',
    type: 'string',
    format: 'time',
    default: '00:00:00',
  })
  @Column({ type: 'time', default: '00:00:00' })
  starttime: Date;

  @ApiProperty({
    description: 'Hora de fin del horario',
    type: 'string',
    format: 'time',
  })
  @Column({ type: 'time' })
  endtime: Date;
}
