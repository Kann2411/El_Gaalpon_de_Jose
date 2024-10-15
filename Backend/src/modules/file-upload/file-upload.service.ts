import { Injectable } from '@nestjs/common';
import { FileRepository } from './file-upload.repository';

@Injectable()
export class FileService {
  constructor(private readonly fileRepository: FileRepository) {}

  uploadImgProfile(id: string, file: Express.Multer.File) {
    return this.fileRepository.uploadImgProfile(id, file);
  }
}
