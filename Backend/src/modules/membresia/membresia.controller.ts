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
import { membresiaService } from './membresia.service';
import { UUID } from 'crypto';
import { Membresia } from './membresia.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Membresia')
@Controller('membresia')
export class MembresiaController {
  constructor(private readonly membresiaService: membresiaService) {}

  @Get()
  getMembresias() {
    return this.membresiaService.getMembresias();
  }

  @Get('seeder')
  seederData() {
    return this.membresiaService.seederData();
  }

  @Get(':id')
  getMembresiaById(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.membresiaService.getMembresiaById(id);
  }

  @Post()
  createMembresia(@Body() membresia: Membresia) {
    return this.membresiaService.createMembresia(membresia);
  }

  @Put()
  updateMembresia(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() membresia: Membresia,
  ) {
    this.membresiaService.updateMembresia(id, membresia);
  }

  @Delete()
  deleteMembresia(@Param('id', ParseUUIDPipe) id: UUID) {
    this.membresiaService.deleteMembresia(id);
  }
}
