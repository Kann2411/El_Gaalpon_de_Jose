/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UUID } from 'crypto';
import { Class } from './classes.entity';
import { ClassService } from './classes.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Class')
@Controller('class')
export class ClassesController {
  constructor(private readonly classesService: ClassService) {}

  @Get()
  async getClasses() {
    try {
      return await this.classesService.getClasses();
    } catch (error) {}
  }

  @Get('seeder')
  getClassesSeeder() {
    return this.classesService.classesSeeder();
  }

  @Get(':id')
  async getClassById(@Param(ParseUUIDPipe) id: UUID) {
    try {
      return await this.classesService.getClassById(id);
    } catch (error) {}
  }

  @Post()
  async createClass(@Body() classData: Class) {
    try {
      return this.classesService.createClass(classData);
    } catch (error) {}
  }

  @Put()
  async updateClass(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() classData: Class,
  ) {
    try {
      return this.classesService.updateClass(id, classData);
    } catch (error) {}
  }

  @Delete()
  async deleteClass(@Param(ParseUUIDPipe) id: UUID) {
    try {
      return this.classesService.deleteClass(id);
    } catch (error) {}
  }
}
