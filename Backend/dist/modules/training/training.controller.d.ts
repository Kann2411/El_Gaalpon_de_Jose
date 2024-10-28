import { TrainingService } from './training.service';
import { CreateTrainingDto } from '../../dtos/createTraining.dto';
export declare class TrainingController {
    private readonly trainingService;
    constructor(trainingService: TrainingService);
    create(createTrainingDto: CreateTrainingDto, req: any): Promise<import("./training.entity").Training>;
    getUserTrainings(req: any): Promise<import("./training.entity").Training[]>;
}
