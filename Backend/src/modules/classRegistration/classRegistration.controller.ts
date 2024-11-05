import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ClassRegistrationService } from './classRegistration.service';
import { OmitPasswordInterceptor } from 'src/interceptors/omitPasswordClassData.interceptor';

@UseInterceptors(OmitPasswordInterceptor)
@Controller('classRegistration')
export class ClassRegistrationController {
  constructor(
    private readonly classRegistrationService: ClassRegistrationService,
  ) {}

  @Get('class/:classId')
  getRegistrationUser(@Param('classId', ParseUUIDPipe) classId: string) {
    return this.classRegistrationService.getRegistrationUser(classId);
  }

  @Get('user/:userId')
  getClassesForUser(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.classRegistrationService.getClassesForUser(userId);
  }

  @Post(':classId/register/:userId')
  registerUserToClass(
    @Param('classId') classId: string,
    @Param('userId') userId: string,
  ) {
    return this.classRegistrationService.registerUserToClass(classId, userId);
  }

  @Delete(':classId/delete/:userId')
  deleteRegisterUserFromClass(
    @Param('classId', ParseUUIDPipe) classId: string,
    @Param('userId', ParseUUIDPipe) userId: string,
  ) {
    return this.classRegistrationService.deleteRegisterUserFromClass(
      classId,
      userId,
    );
  }
}
