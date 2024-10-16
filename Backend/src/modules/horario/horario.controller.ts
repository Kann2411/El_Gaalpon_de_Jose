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
import { Horario } from './horario.entity';
import { HorarioService } from './horario.service';

@Controller('class')
export class HorarioController {
  constructor(private readonly horarioService: HorarioService) {}

  @Get()
  async getHorario() {
    try {
      return await this.horarioService.getHorarios();
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  async getHorarioById(@Param(ParseUUIDPipe) id: UUID) {
    try {
      return await this.horarioService.getHorarioById(id);
    } catch (error) {
      return error;
    }
  }

  @Post()
  async createHorario(@Body() horarioData: Horario) {
    try {
      return this.horarioService.createHorario(horarioData);
    } catch (error) {
      return error;
    }
  }

  @Put()
  async updateHorario(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() horarioData: Horario,
  ) {
    try {
      return this.horarioService.updateHorario(id, horarioData);
    } catch (error) {
      return error;
    }
  }

  @Delete()
  async deleteClass(@Param(ParseUUIDPipe) id: UUID) {
    try {
      return this.horarioService.deleteHorario(id);
    } catch (error) {
      return error;
    }
  }
}
