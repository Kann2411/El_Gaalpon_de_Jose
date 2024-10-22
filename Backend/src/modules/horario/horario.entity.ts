import { ApiProperty } from '@nestjs/swagger';
import { Dia } from 'src/enums/dia.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Class } from '../classes/classes.entity';

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

  @ApiProperty({
    description: 'Clases asignadas a este horario',
    type: () => [Class],
  })
  @OneToMany(() => Class, (classEntity) => classEntity.schedule)
  classes: Class[];
}
