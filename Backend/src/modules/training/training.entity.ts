import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/users.entity';

@Entity('trainings')
export class Training {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'float' })
  duration: number;

  @Column({ type: 'varchar', length: 255 })
  progress: string;

  @ManyToOne(() => User, (user) => user.trainings)
  user: User;

  registerProgress(newProgress: string) {
    this.progress = newProgress;
  }
}
