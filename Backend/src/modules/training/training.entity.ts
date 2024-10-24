import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/users.entity';

@Entity('trainings')
export class Training {
  @ApiProperty({
    description: 'Identificador único del entrenamiento',
    type: 'string',
    format: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Fecha del entrenamiento',
    type: 'string',
  })
  @Column({ type: 'varchar' })
  date: string;

  @ApiProperty({
    description: 'Duración del entrenamiento en horas',
    type: 'string',
  })
  @Column({ type: 'varchar' })
  duration: string;

  @ApiProperty({ description: 'Progreso del entrenamiento' })
  @Column({ type: 'varchar', length: 255 })
  progress: string;

  @ApiProperty({
    description: 'Usuario asociado al entrenamiento',
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.trainings)
  user: User;

  registerProgress(newProgress: string) {
    this.progress = newProgress;
  }
}
