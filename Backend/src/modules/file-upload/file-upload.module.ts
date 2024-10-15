import { Module } from '@nestjs/common';
import { FileUploadController } from './file-upload.controller';
import { FileService } from './file-upload.service';
import { FileRepository } from './file-upload.repository';
import { cloudinaryConfig } from 'src/config/cludinary';

@Module({
  imports: [],
  controllers: [FileUploadController],
  providers: [FileService, FileRepository, cloudinaryConfig],
})
export class FileUploadModule {}
