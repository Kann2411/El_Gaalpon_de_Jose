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

  @Get(':id')
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUserById(id);
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: CreateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
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
