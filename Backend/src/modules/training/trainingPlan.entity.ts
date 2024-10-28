import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/users.entity';

@Entity('training_plans')
export class TrainingPlan {
  @ApiProperty({
    description: 'Identificador único del plan de entrenamiento',
    type: 'string',
    format: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Descripción del plan de entrenamiento' })
  @Column({ type: 'varchar', length: 255 })
  description: string;

  @ApiProperty({
    description: 'Archivo asociado al plan de entrenamiento',
    type: 'string',
  })
  @Column({ type: 'varchar', length: 255 })
  file: string = 'default-image-url';

  @ApiProperty({
    description: 'Entrenador asociado al plan de entrenamiento',
    type: () => User,
  })
  @ManyToOne(() => User, (coach) => coach.trainingPlans)
  coach: User;

  downloadPlan() {
    // Lógica para descargar el archivo
  }
}
