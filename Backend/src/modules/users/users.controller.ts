import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dtos/createUser.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Role } from '../enums/role.enum';
import { Roles } from '../decorators/role.decorator';


@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  async getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id',ParseUUIDPipe) id: string) {
    return this.usersService.getUserById(id);
  }

  @Put(':id')
  async updateUser(@Param('id',ParseUUIDPipe) id: string, @Body() updateUserDto: CreateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id',ParseUUIDPipe) id: string) {
    return this.usersService.delete(id);
  }

}

