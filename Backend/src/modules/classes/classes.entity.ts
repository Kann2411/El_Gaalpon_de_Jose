import { ApiProperty } from '@nestjs/swagger';
import { EstadoClase } from 'src/enums/estadoClase.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Horario as Schedule } from '../horario/horario.entity';

@Entity({ name: 'classes' })
export class Class {
  @ApiProperty({
    description: 'Identificador único de la clase',
    type: 'string',
    format: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Nombre de la clase' })
  @Column({ nullable: false })
  name: string;

  @ApiProperty({
    description: 'Intensidad de la clase',
  })
  @Column()
  intensity: string;

  @ApiProperty({
    description: 'Capacidad máxima de la clase',
    type: 'integer',
    default: 0,
  })
  @Column({ type: 'int', default: 0 })
  capacity: number;

  @ApiProperty({
    description: 'Estado actual de la clase',
    enum: EstadoClase,
  })
  @Column()
  status: EstadoClase;

  @Column({ type: 'varchar', default: 'defaultImage.webp' })
  image: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  duration: string;

  @ApiProperty({
    description: 'Horario asignado a la clase',
    type: () => Schedule,
  })
  @ManyToOne(() => Schedule, (horario) => horario.classes)
  schedule: Schedule;
}
