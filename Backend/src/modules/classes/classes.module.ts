import { Module } from '@nestjs/common';
import { ClassService } from './classes.service';
import { ClassRepository } from './classes.repository';
import { ClassesController } from './classes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './classes.entity';
import { User } from '../users/users.entity';
import { FileRepository } from '../file-upload/file-upload.repository';
import { ClassRegistration } from './classesRegistration.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Class, User, ClassRegistration])],
  providers: [ClassService, ClassRepository, FileRepository],
  controllers: [ClassesController],
})
export class ClassesModule {}
