import { Training } from './training.entity';
import { Repository } from 'typeorm';
import { CreateTrainingDto } from '../../dtos/createTraining.dto';
import { User } from '../users/users.entity';
export declare class TrainingRepository {
    private readonly trainingRepository;
    constructor(trainingRepository: Repository<Training>);
    createTraining(createTrainingDto: CreateTrainingDto, user: User): Promise<Training>;
    getTrainingsByUser(userId: string): Promise<Training[]>;
}
