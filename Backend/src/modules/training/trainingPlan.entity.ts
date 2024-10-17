import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/users.entity';

@Entity('training_plans')
export class TrainingPlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  file: string; // Ruta del archivo o nombre del archivo

  // Relación muchos a uno con User (entrenador)
  @ManyToOne(() => User, (coach) => coach.trainingPlans)
  coach: User;

  // Método para descargar el plan
  downloadPlan() {
    // Lógica para descargar el archivo
  }
}
