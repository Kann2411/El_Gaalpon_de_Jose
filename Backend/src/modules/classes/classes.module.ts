import { Module } from '@nestjs/common';
import { ClassService } from './classes.service';
import { ClassRepository } from './classes.repository';
import { ClassesController } from './classes.controller';

@Module({
  imports: [],
  providers: [ClassService, ClassRepository],
  controllers: [ClassesController],
})
export class ClassesModule {}
