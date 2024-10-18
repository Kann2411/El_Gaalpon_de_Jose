import { Injectable } from '@nestjs/common';
import { Class } from './classes.entity';
import { UUID } from 'crypto';
import { DataSource, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { HorarioRepository } from '../horario/horario.repository';

@Injectable()
export class ClassRepository {
  constructor(
    @InjectRepository(Class)
    private readonly classesRepository: Repository<Class>,
    private readonly horarioRepository: HorarioRepository,
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

  async getClassById(id: UUID) {
    try {
      const classData = await this.classesRepository.findOne({
        where: { id },
        relations: { horario: true },
      });
      if (!classData) {
        throw new Error('No se encontró la clase.');
      }
      return classData;
    } catch (error) {
      throw error;
    }
  }

  async createClass(classData: Class) {
    return await this.dataSource.transaction(async (manager) => {
      try {
        // Esto por si necesita el front
        // const horario = this.horarioRepository.createHorario(classData.horario)
        // newClass.horario = horario
        const newClass = manager.create(Class, classData);
        await manager.save(newClass);
        return newClass;
      } catch (error) {
        throw error;
      }
    });
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
}
