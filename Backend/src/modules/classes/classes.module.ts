import { Module } from '@nestjs/common';
import { ClassService } from './classes.service';
import { ClassRepository } from './classes.repository';
import { ClassesController } from './classes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './classes.entity';
import { User } from '../users/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Class]),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [ClassService, ClassRepository],
  controllers: [ClassesController],
})
export class ClassesModule {}
