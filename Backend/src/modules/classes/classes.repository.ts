import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Class } from './classes.entity';
import { UUID } from 'crypto';
import { DataSource, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { CreateClassDto } from 'src/dtos/createClass.dto';
import { User } from '../users/users.entity';
import { FileRepository } from '../file-upload/file-upload.repository';
import { ClassRegistration } from './classesRegistration.entity';

@Injectable()
export class ClassRepository {
  constructor(
    @InjectRepository(Class)
    private readonly classesRepository: Repository<Class>,
    @InjectRepository(ClassRegistration)
    private readonly classRegistrationRepository: Repository<ClassRegistration>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectDataSource() private dataSource: DataSource,
    private readonly fileRepository: FileRepository,
  ) {}

  async getClasses() {
    try {
      const classes = await this.classesRepository.find();
      if (!classes) {
        throw new Error('No se encontraron clases.');
      }
      return classes;
    } catch (error) {
      throw error;
    }
  }

  async getClassById(id: UUID) {
    try {
      const classData = await this.classesRepository.findOneBy({ id });
      if (!classData) {
        throw new Error('No se encontró la clase.');
      }
      return classData;
    } catch (error) {
      throw error;
    }
  }

  async createClass(classData: CreateClassDto) {
    const {
      name,
      capacity,
      status,
      description,
      duration,
      intensity,
      day,
      starttime,
      endtime,
      coach,
      file,
    } = classData;

    const coachUser = await this.userRepository.findOneBy({ id: coach });
    if (!coachUser) {
      throw new BadRequestException(`coach con id ${coachUser} not found`);
    }

    const nuevaClase = new Class();
    nuevaClase.name = name;
    nuevaClase.capacity = Number(capacity);
    nuevaClase.status = status;
    nuevaClase.description = description;
    nuevaClase.duration = duration;
    nuevaClase.intensity = intensity;
    nuevaClase.day = day;
    nuevaClase.starttime = starttime;
    nuevaClase.endtime = endtime;
    nuevaClase.image = file;
    nuevaClase.coach = coachUser;

    await this.classesRepository.save(nuevaClase);

    return {
      class: nuevaClase,
    };
  }

  async updateClass(id: string, classData: Partial<Class>) {
    const classToUpdate = await this.classesRepository.findOneBy({ id });
    if (!classToUpdate) {
      throw new NotFoundException(`Class with id ${id} not found`);
    }
    await this.classesRepository.update(id, classData);
    const foundClassUpdate = await this.classesRepository.findOneBy({ id });
    return foundClassUpdate;
  }

  async deleteClass(id: string) {
    const classFound = await this.classesRepository.findOneBy({ id });
    if (!classFound) {
      throw new Error('No se encontró la clase.');
    }
    await this.classRegistrationRepository.delete({ classEntity: { id } });
    await this.classesRepository.delete(classFound);
    return { message: 'Class deleted successfully' };
  }
}
