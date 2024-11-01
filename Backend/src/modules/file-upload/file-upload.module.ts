import { Module } from '@nestjs/common';
import { FileUploadController } from './file-upload.controller';
import { FileService } from './file-upload.service';
import { FileRepository } from './file-upload.repository';
import { cloudinaryConfig } from 'src/config/cludinary';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { UsersRepository } from '../users/users.repository';
import { TrainingPlan } from '../training/trainingPlan.entity';
import { Class } from '../classes/classes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, TrainingPlan, Class])],
  controllers: [FileUploadController],
  providers: [FileService, FileRepository, cloudinaryConfig, UsersRepository],
})
export class FileUploadModule {}
