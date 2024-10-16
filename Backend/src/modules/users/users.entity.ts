import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Role } from '../../enums/role.enum';
import { Training } from '../training/training.entity';
import { TrainingPlan } from '../training/trainingPlan.entity';
import { RegistrationMethod } from 'src/enums/registrationMethod';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 8 })
  dni: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 128 })
  password: string;

  @Column({ type: 'varchar', nullable: true })
  phone: string;

  @Column({ type: 'varchar', nullable: true })
  imgUrl: string = 'default-image-url';

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  @Column({
    type: 'enum',
    enum: RegistrationMethod,
    default: RegistrationMethod.Form, 
  })
  registrationMethod: RegistrationMethod;

  @OneToMany(() => Training, (training) => training.user)
  trainings: Training[];

  @OneToMany(() => TrainingPlan, (trainingPlan) => trainingPlan.coach)
  trainingPlans: TrainingPlan[];
}
