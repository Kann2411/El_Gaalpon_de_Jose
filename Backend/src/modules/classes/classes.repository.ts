import { BadRequestException, Injectable } from '@nestjs/common';
import { Class } from './classes.entity';
import { UUID } from 'crypto';
import { DataSource, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { CreateClassDto } from 'src/dtos/createClass.dto';
import { User } from '../users/users.entity';
import { FileRepository } from '../file-upload/file-upload.repository';

@Injectable()
export class ClassRepository {
  constructor(
    @InjectRepository(Class)
    private readonly classesRepository: Repository<Class>,
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

  async updateClass(id: UUID, classData: Class) {
    return this.dataSource.manager.transaction(async (manager) => {
      try {
        let oldClass = await this.getClassById(id);
        // Se verifica que la clase con el id exista
        if (!oldClass) {
          throw new Error('No se encontró la clase.');
        }
        // Se actualizan los datos a la clase
        oldClass = {
          id: oldClass.id,
          ...classData,
        };
        // Se guardan los cambios a la base de datos
        await manager.save(oldClass);
        // retorna la clase actualizada
        return oldClass;
      } catch (error) {
        throw error;
      }
    });
  }

  async deleteClass(id: UUID) {
    const classFound = await this.classesRepository.findOneBy({ id });
    if (!classFound) {
      throw new Error('No se encontró la clase.');
    }
    await this.classesRepository.delete(classFound);
    return { message: 'Class deleted successfully' };
  }
}
