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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Horario')
@Controller('horario')
export class HorarioController {
  constructor(private readonly horarioService: HorarioService) {}

  @Get()
  getHorario() {
    return this.horarioService.getHorarios();
  }

  @Get('seeder')
  horariosSeeder() {
    return this.horarioService.horariosSeeder();
  }

  @Get(':id')
  getHorarioById(@Param(ParseUUIDPipe) id: UUID) {
    return this.horarioService.getHorarioById(id);
  }

  @Post()
  createHorario(@Body() horarioData: Horario) {
    return this.horarioService.createHorario(horarioData);
  }

  @Put()
  updateHorario(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() horarioData: Horario,
  ) {
    return this.horarioService.updateHorario(id, horarioData);
  }

  @Delete()
  deleteClass(@Param(ParseUUIDPipe) id: UUID) {
    return this.horarioService.deleteHorario(id);
  }
}
