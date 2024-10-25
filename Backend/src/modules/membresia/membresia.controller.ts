import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { membresiaService } from './membresia.service';
import { UUID } from 'crypto';
import { Membresia } from './membresia.entity';
import { ApiTags } from '@nestjs/swagger';
import { MembresiaDto } from 'src/dtos/createMembresia.dto';
import { Roles } from 'src/decorators/role.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/enums/role.enum';

@ApiTags('Membresia')
@Controller('membresia')
export class MembresiaController {
  constructor(private readonly membresiaService: membresiaService) {}

  @Get()
  getMembresias() {
    return this.membresiaService.getMembresias();
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Get('seeder')
  seederData() {
    return this.membresiaService.seederData();
  }

  @Get(':id')
  getMembresiaById(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.membresiaService.getMembresiaById(id);
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Post()
  createMembresia(@Body() membresiaDto: MembresiaDto) {
    return this.membresiaService.createMembresia(membresiaDto);
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Put()
  updateMembresia(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() membresia: Membresia,
  ) {
    this.membresiaService.updateMembresia(id, membresia);
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Delete()
  deleteMembresia(@Param('id', ParseUUIDPipe) id: UUID) {
    this.membresiaService.deleteMembresia(id);
  }
}
