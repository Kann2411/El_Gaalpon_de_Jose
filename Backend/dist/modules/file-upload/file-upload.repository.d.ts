import { UploadApiResponse } from 'cloudinary';
export declare class FileRepository {
    uploadImage(file: Express.Multer.File): Promise<UploadApiResponse>;
}
