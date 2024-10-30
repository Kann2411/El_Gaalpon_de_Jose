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

  getClassById(id: UUID) {
    return this.classesRepository.getClassById(id);
  }

  createClass(classData: CreateClassDto, file: Express.Multer.File) {
    return this.classesRepository.createClass(classData, file);
  }

  updateClass(id: UUID, classData: Class) {
    return this.classesRepository.updateClass(id, classData);
  }

  deleteClass(id: UUID) {
    return this.classesRepository.deleteClass(id);
  }
}
