import { TrainingPlanRepository } from './trainingPlan.repository';
import { CreateTrainingPlanDto } from '../../dtos/createTrainingPlan.dto';
import { User } from '../users/users.entity';
export declare class TrainingPlanService {
    private readonly trainingPlanRepository;
    constructor(trainingPlanRepository: TrainingPlanRepository);
    createTrainingPlan(planDto: CreateTrainingPlanDto, coach: User): Promise<import("./trainingPlan.entity").TrainingPlan>;
    getAllTrainingPlans(): Promise<import("./trainingPlan.entity").TrainingPlan[]>;
    deleteTrainingPlans(id: string): Promise<string>;
}
