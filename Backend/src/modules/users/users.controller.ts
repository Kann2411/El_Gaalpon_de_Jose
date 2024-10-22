import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../../dtos/createUser.dto';
import { RolesGuard } from '../../guards/roles.guard';
import { Role } from '../../enums/role.enum';
import { Roles } from '../../decorators/role.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateProfileDto } from 'src/dtos/updateProfile.dto';
import { ChangePasswordDto } from 'src/dtos/changePassword.dto';
import { SetPasswordDto } from 'src/dtos/setPassword.dto';

@ApiTags('Users')
@ApiBearerAuth()
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get('img-profile/:id')
  getUserByIdImag(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUserByIdImag(id);
  }

  @Get(':id')
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUserById(id);
  }

  @Put('profile/:id')
  updateProfile(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.usersService.updateProfile(id, updateProfileDto);
  }

  @Put('change-password/:id')
  async changePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.usersService.changePassword(id, changePasswordDto);
  }

  @Put('set-password/:id')
  async setPassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() setPasswordDto: SetPasswordDto,
  ) {
    return this.usersService.setPassword(id, setPasswordDto);
  }

  @Patch('changeRole/:id')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  patchUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('role') role: string,
  ) {
    return this.usersService.patchUser(id, role);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.delete(id);
  }
}
