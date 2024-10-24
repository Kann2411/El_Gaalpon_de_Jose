import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { Class } from './classes.entity';
import { ClassRepository } from './classes.repository';
import { CreateClassDto } from 'src/dtos/createClass.dto';

@Injectable()
export class ClassService {
  constructor(private readonly classesRepository: ClassRepository) {}

  getClasses() {
    return this.classesRepository.getClasses();
  }

  classesSeeder() {
    return this.classesRepository.classesSeeder();
  }

  getClassById(id: UUID) {
    return this.classesRepository.getClassById(id);
  }

  createClass(classData: CreateClassDto) {
    return this.classesRepository.createClass(classData);
  }

  updateClass(id: UUID, classData: Class) {
    return this.classesRepository.updateClass(id, classData);
  }

  deleteClass(id: UUID) {
    return this.classesRepository.deleteClass(id);
  }

  registerUserToClass(classId: string, userId: string) {
    return this.classesRepository.registerUserToClass(classId, userId);
  }
}
