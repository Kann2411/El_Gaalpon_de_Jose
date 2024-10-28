import { FileService } from './file-upload.service';
export declare class FileUploadController {
    private readonly fileService;
    constructor(fileService: FileService);
    uploadImage(trainingId: string, file: Express.Multer.File): Promise<import("../training/trainingPlan.entity").TrainingPlan>;
    imageProfile(id: string, file: Express.Multer.File): Promise<import("../users/users.entity").User>;
}
