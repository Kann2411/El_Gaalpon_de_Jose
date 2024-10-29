import { TrainingPlan } from './trainingPlan.entity';
import { Repository } from 'typeorm';
import { CreateTrainingPlanDto } from 'src/dtos/createTrainingPlan.dto';
import { User } from '../users/users.entity';
export declare class TrainingPlanRepository {
    private readonly trainingPlanRepository;
    constructor(trainingPlanRepository: Repository<TrainingPlan>);
    createTrainingPlan(planDto: CreateTrainingPlanDto, coach: User): Promise<TrainingPlan>;
    getAllTrainingPlans(): Promise<TrainingPlan[]>;
    deleteTrainingPlans(id: string): Promise<string>;
}
