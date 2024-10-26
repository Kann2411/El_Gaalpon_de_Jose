import { Injectable } from '@nestjs/common';
import { classRegistrationRepository } from './classRegistration.repository';

@Injectable()
export class ClassRegistrationService {
  constructor(private readonly classRepository: classRegistrationRepository) {}

  getRegistrationUser(classId) {
    return this.classRepository.getRegistrationUser(classId);
  }

  registerUserToClass(classId: string, userId: string) {
    return this.classRepository.registerUserToClass(classId, userId);
  }

  deleteRegisterUserFromClass(classId: string, userId: string) {
    return this.classRepository.deleteRegisterUserFromClass(classId, userId);
  }
}
