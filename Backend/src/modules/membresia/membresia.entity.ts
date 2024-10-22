import { ApiProperty } from '@nestjs/swagger';
import { EstadoMembresia } from 'src/enums/estadoMembresia.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FeatureEntity } from './features.entity';

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

  @Column({ type: 'decimal' })
  price: number;

  @ApiProperty({
    description: 'Moneda del plan',
    type: 'string',
  })
  @Column()
  currency: string;

  @ApiProperty({
    description: 'Fecha de inicio de la membresía',
    type: 'string',
    format: 'date',
  })
  @Column({ type: 'date', nullable: true })
  startDate?: Date;

  @ApiProperty({
    description: 'Fecha de fin de la membresía',
    type: 'string',
    format: 'date',
    nullable: true,
  })
  @Column({ type: 'date', nullable: true })
  endDate?: Date;

  @ApiProperty({
    description: 'Período de facturación del plan',
    type: 'string',
  })
  @Column()
  billing_period: string;

  @ApiProperty({
    description: 'Estado de la membresía',
    nullable: true,
    enum: EstadoMembresia,
  })
  @Column()
  status?: EstadoMembresia;

  @OneToMany(() => FeatureEntity, (feature) => feature.membresia, {
    cascade: true,
  })
  features: FeatureEntity[];
}
