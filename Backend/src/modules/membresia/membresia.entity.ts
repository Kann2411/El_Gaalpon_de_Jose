import { ApiProperty } from '@nestjs/swagger';
import { EstadoMembresia } from 'src/enums/estadoMembresia.enum';
import { TipoMembresia } from 'src/enums/tipoMembresia.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'membresias' })
export class Membresia {
  @ApiProperty({
    description: 'Identificador único de la membresía',
    type: 'string',
    format: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Tipo de membresía', enum: TipoMembresia })
  @Column()
  tipo: TipoMembresia;

  @ApiProperty({ description: 'Fecha de inicio de la membresía', type: 'string', format: 'date' })
  @Column({ type: 'date' })
  fechaInicio: Date;

  @ApiProperty({ description: 'Fecha de fin de la membresía', type: 'string', format: 'date' })
  @Column({ type: 'date' })
  fechaFin: Date;

  @ApiProperty({ description: 'Estado de la membresía', enum: EstadoMembresia })
  @Column()
  estado: EstadoMembresia;
}
