import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Membresia } from './membresia.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'features' })
export class FeatureEntity {
  @ApiProperty({
    description: 'ID de la característica',
    type: 'string',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  value?: boolean;

  @ManyToOne(() => Membresia, (membresia) => membresia.features)
  membresia: Membresia;
}
