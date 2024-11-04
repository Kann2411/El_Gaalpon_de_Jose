import { ApiProperty } from '@nestjs/swagger';
import { EstadoMembresia } from 'src/enums/estadoMembresia.enum';
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

  @ApiProperty({ description: 'Tipo de membresía' })
  @Column()
  plan: string;

  @ApiProperty({
    description: 'Precio de la membresía',
    type: 'number',
  })
  @Column({ type: 'decimal' })
  price: number;

  @ApiProperty({
    description: 'Moneda de la membresía',
    type: 'string',
  })
  @Column()
  currency: string;

  @ApiProperty({
    description: 'Descripción de la membresía',
    type: 'string',
  })
  @Column()
  description: string;

  @ApiProperty({
    description: 'Beneficios de la membresía',
    type: 'array',
    items: { type: 'string' },
  })
  @Column('text', { array: true })
  benefits: string[];

  @ApiProperty({
    description: 'Ideal para el tipo de persona',
    type: 'string',
  })
  @Column()
  idealFor: string;

}
