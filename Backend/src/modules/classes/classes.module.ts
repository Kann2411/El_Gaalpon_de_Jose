import { Module } from '@nestjs/common';
import { ClassService } from './classes.service';
import { ClassRepository } from './classes.repository';
import { ClassesController } from './classes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Horario } from '../horario/horario.entity';
import { Class } from './classes.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Horario]),
    TypeOrmModule.forFeature([Class]),
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
