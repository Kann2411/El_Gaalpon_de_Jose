import { TrainingRepository } from './training.repository';
import { CreateTrainingDto } from '../../dtos/createTraining.dto';
import { User } from '../users/users.entity';
export declare class TrainingService {
    private readonly trainingRepository;
    constructor(trainingRepository: TrainingRepository);
    createTraining(createTrainingDto: CreateTrainingDto, user: User): Promise<import("./training.entity").Training>;
    getUserTrainings(userId: string): Promise<import("./training.entity").Training[]>;
}
