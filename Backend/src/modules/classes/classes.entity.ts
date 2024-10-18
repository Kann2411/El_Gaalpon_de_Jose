import { ApiProperty } from '@nestjs/swagger';
import { EstadoClase } from 'src/enums/estadoClase.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Horario } from '../horario/horario.entity';

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
    description: 'Capacidad máxima de la clase',
    type: 'integer',
    default: 0,
  })
  @Column({ type: 'int', default: 0 })
  capacidad: number;

  @ApiProperty({
    description: 'Estado actual de la clase',
    enum: EstadoClase,
  })
  @Column()
  estado: EstadoClase;

  @ApiProperty({
    description: 'Horario asignado a la clase',
    type: () => Horario,
  })
  @ManyToOne(() => Horario, (horario) => horario.classes)
  horario: Horario;
}
