import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Class } from '../classes/classes.entity';
import { ClassRegistration } from './classesRegistration.entity';
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
      throw new HttpException('Class not found', HttpStatus.NOT_FOUND);
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
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return userWithClasses.registrations.map(
      (registration) => registration.classEntity,
    );
  }

  async registerUserToClass(classId, userId) {
    const classEntity = await this.classesRepository.findOneBy({ id: classId });
    if (!classEntity) {
      throw new HttpException('Class not found', HttpStatus.NOT_FOUND);
    }

    const registrations = classEntity.registrations || [];
    if (registrations.length >= classEntity.capacity) {
      throw new HttpException('Class is full', HttpStatus.BAD_REQUEST);
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
      throw new HttpException('You are not registered in this class', HttpStatus.BAD_REQUEST);
    }
    await this.classRegistrationRepository.remove(registration);
    return { message: 'class canceled successfully' };
  }
}
