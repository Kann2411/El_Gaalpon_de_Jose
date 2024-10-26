import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ClassRegistrationService } from './classRegistration.service';

@Controller('classRegistration')
export class ClassRegistrationController {
  constructor(
    private readonly classRegistrationService: ClassRegistrationService,
  ) {}

  @Get(':classId')
  getRegistrationUser(@Param('classId') classId: string) {
    return this.classRegistrationService.getRegistrationUser(classId);
  }

  @Post(':classId/register/:userId')
  registerUserToClass(
    @Param('classId') classId: string,
    @Param('userId') userId: string,
  ) {
    return this.classRegistrationService.registerUserToClass(classId, userId);
  }

  @Delete('classId/delete/:userId')
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
