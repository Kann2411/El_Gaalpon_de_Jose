import { Role } from '../../enums/role.enum';
import { Training } from '../training/training.entity';
import { TrainingPlan } from '../training/trainingPlan.entity';
import { RegistrationMethod } from 'src/enums/registrationMethod';
import { ClassRegistration } from '../classes/classesRegistration.entity';
export declare class User {
    id: string;
    name: string;
    dni: string;
    email: string;
    password: string;
    phone: string;
    imgUrl: string;
    role: Role;
    registrationMethod: RegistrationMethod;
    isBanned: boolean;
    trainings: Training[];
    trainingPlans: TrainingPlan[];
    registrations: ClassRegistration[];
}
