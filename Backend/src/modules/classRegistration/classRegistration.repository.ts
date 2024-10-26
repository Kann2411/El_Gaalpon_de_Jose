import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Class } from '../classes/classes.entity';
import { ClassRegistration } from '../classes/classesRegistration.entity';
import { User } from '../users/users.entity';

@Injectable()
export class classRegistrationRepository {
  constructor(
    @InjectRepository(User)
    private readonly userDBRepository: Repository<User>,
    @InjectRepository(Class)
    private readonly classesRepository: Repository<Class>,
    @InjectRepository(ClassRegistration)
    private readonly classRegistrationRepository: Repository<ClassRegistration>,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  async getRegistrationUser(classId) {
    const classEntity = await this.classesRepository
      .createQueryBuilder('class')
      .leftJoinAndSelect('class.registrations', 'registration')
      .leftJoinAndSelect('registration.user', 'user')
      .where('class.id = :classId', { classId })
      .getOne();

    if (!classEntity) {
      throw new NotFoundException('Clase no encontrada');
    }
    return classEntity;
  }

  async getClassesForUser(userId) {
    const userWithClasses = await this.userDBRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.registrations', 'registration')
      .leftJoinAndSelect('registration.classEntity', 'classEntity')
      .where('user.id = :userId', { userId })
      .getOne();

    if (!userWithClasses) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return userWithClasses.registrations.map(
      (registration) => registration.classEntity,
    );
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

  async deleteRegisterUserFromClass(classId, userId) {
    const registration = await this.classRegistrationRepository.findOne({
      where: { user: { id: userId }, classEntity: { id: classId } },
    });
    if (!registration) {
      throw new NotFoundException('No estas registrado en esta clase');
    }
    await this.classRegistrationRepository.remove(registration);
  }
}
