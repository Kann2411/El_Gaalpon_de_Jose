import { TrainingPlanService } from './trainingPlan.service';
import { CreateTrainingPlanDto } from '../../dtos/createTrainingPlan.dto';
export declare class TrainingPlanController {
    private readonly trainingPlanService;
    constructor(trainingPlanService: TrainingPlanService);
    create(createTrainingPlanDto: CreateTrainingPlanDto, req: any): Promise<import("./trainingPlan.entity").TrainingPlan>;
    getAll(): Promise<import("./trainingPlan.entity").TrainingPlan[]>;
    delete(id: string): Promise<string>;
}
