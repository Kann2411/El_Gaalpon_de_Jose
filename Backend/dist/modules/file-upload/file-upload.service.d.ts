import { FileRepository } from './file-upload.repository';
import { TrainingPlan } from '../training/trainingPlan.entity';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';
export declare class FileService {
    private readonly fileRepository;
    private readonly trainingPlanRepository;
    private readonly userRepository;
    constructor(fileRepository: FileRepository, trainingPlanRepository: Repository<TrainingPlan>, userRepository: Repository<User>);
    uploadImgProfile(userid: string, file: Express.Multer.File): Promise<User>;
    updateClassImage(trainingId: string, file: Express.Multer.File): Promise<TrainingPlan>;
}
