import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Class } from './classes.entity';
import { UUID } from 'crypto';
import { DataSource, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import * as clases from '../../utils/clases.json';
import { EstadoClase } from 'src/enums/estadoClase.enum';
import { CreateClassDto } from 'src/dtos/createClass.dto';
import { User } from '../users/users.entity';
import { ClassRegistration } from './classesRegistration.entity';

@Injectable()
export class ClassRepository {
  constructor(
    @InjectRepository(User)
    private readonly userDBRepository: Repository<User>,
    @InjectRepository(Class)
    private readonly classesRepository: Repository<Class>,
    @InjectRepository(ClassRegistration)
    private readonly classRegistrationRepository: Repository<ClassRegistration>,
    @InjectDataSource() private dataSource: DataSource,
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

  async classesSeeder() {
    for (const classItem of clases) {
      const nuevaClase = new Class();
      nuevaClase.name = classItem.name;
      nuevaClase.capacity = classItem.capacity;
      nuevaClase.intensity = classItem.intensity;
      nuevaClase.duration = classItem.duration;
      nuevaClase.image = classItem.image;
      nuevaClase.description = classItem.description;
      nuevaClase.status = EstadoClase[classItem.status as keyof EstadoClase];
      nuevaClase.day = classItem.day.toLowerCase();
      nuevaClase.starttime = classItem.startTime;
      nuevaClase.endtime = classItem.endTime;

      await this.classesRepository.save(nuevaClase);
    }

    return { message: 'Clases creadas con éxito' };
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
    const nuevaClase = new Class();
    nuevaClase.name = classData.name;
    nuevaClase.capacity = classData.capacity;
    nuevaClase.status = classData.status;
    nuevaClase.image = classData.image;
    nuevaClase.description = classData.description;
    nuevaClase.duration = classData.duration;
    nuevaClase.intensity = classData.intensity;
    nuevaClase.day = classData.day;
    nuevaClase.starttime = classData.starttime;
    nuevaClase.endtime = classData.endtime;

    await this.classesRepository.save(nuevaClase);

    const savedClass = await this.classesRepository.findOneBy({
      name: nuevaClase.name,
    });

    return savedClass;
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
    return await this.dataSource.transaction(async (manager) => {
      try {
        const classData = await this.getClassById(id);
        if (!classData) {
          throw new Error('No se encontró la clase.');
        }
        await manager.remove(classData);
        return 'Clase eliminada exitosamente';
      } catch (error) {
        throw error;
      }
    });
  }

  async registerUserToClass(classId, userId) {
    const classEntity = await this.classesRepository.findOneBy({ id: classId });
    if (!classEntity) {
      throw new NotFoundException('La clase no existe');
    }

    const registrations = classEntity.registrations || [];
    if (registrations.length >= classEntity.capacity) {
      throw new BadRequestException('La clase está llena');
    }

    const user = await this.userDBRepository.findOneBy({ id: userId });
    const registration = this.classRegistrationRepository.create({
      user,
      classEntity,
    });
    await this.classRegistrationRepository.save(registration);
    return {
      message: `${user.name} te has registrado con exito a la clase de ${classEntity.name}`,
    };
  }
}
