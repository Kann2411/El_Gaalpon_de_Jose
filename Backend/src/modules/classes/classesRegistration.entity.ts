import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/users.entity';
import { Class } from './classes.entity';

@Entity('class_registrations')
export class ClassRegistration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.registrations)
  user: User;

  @ManyToOne(() => Class, (classEntity) => classEntity.registrations)
  classEntity: Class;
}
