import { Module } from '@nestjs/common';
import { ClassService } from './classes.service';
import { ClassRepository } from './classes.repository';
import { ClassesController } from './classes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './classes.entity';
import { User } from '../users/users.entity';
import { ClassRegistration } from './classesRegistration.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Class]),
    TypeOrmModule.forFeature([ClassRegistration]),
  ],
  providers: [ClassService, ClassRepository],
  controllers: [ClassesController],
})
export class ClassesModule {
  constructor(private readonly classRepository: ClassRepository) {}

  async onModuleInit() {
    console.log('preload Classes');
    await this.classRepository.classesSeeder();
  }
}
