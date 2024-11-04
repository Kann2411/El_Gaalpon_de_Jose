import { Module } from '@nestjs/common';
import { ClassRegistrationController } from './classRegistration.controller';
import { ClassRegistrationService } from './classRegistration.service';
import { classRegistrationRepository } from './classRegistration.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { ClassRegistration } from './classesRegistration.entity';
import { Class } from '../classes/classes.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([ClassRegistration]),
    TypeOrmModule.forFeature([Class]),
  ],
  controllers: [ClassRegistrationController],
  providers: [ClassRegistrationService, classRegistrationRepository],
})
export class ClassRegistrationModule {}
