import {
  Body,
  Controller,
  // Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  // Put,
  UseGuards,
} from '@nestjs/common';
import { membresiaService } from './membresia.service';
import { ApiTags } from '@nestjs/swagger';
import { MembresiaDto } from 'src/dtos/createMembresia.dto';
import { RolesGuard } from '../../guards/roles.guard';
import { Role } from '../../enums/role.enum';
import { Roles } from '../../decorators/role.decorator';
import { AuthGuard } from 'src/guards/auth.guard';

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

  // @Get(':id')
  // getMembresiaById(@Param('id', ParseUUIDPipe) id: UUID) {
  //   return this.membresiaService.getMembresiaById(id);
  // }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Post()
  createMembresia(@Body() membresiaDto: MembresiaDto) {
    return this.membresiaService.createMembresia(membresiaDto);
  }

  @Patch('price/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  updateMembresiaPrice(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('price') price: number,
  ) {
    return this.membresiaService.updateMembresiaPrice(id, price);
  }

  // @Roles(Role.Admin)
  // @UseGuards(RolesGuard)
  // @Put()
  // updateMembresia(
  //   @Param('id', ParseUUIDPipe) id: UUID,
  //   @Body() membresia: Membresia,
  // ) {
  //   this.membresiaService.updateMembresia(id, membresia);
  // }

  // @Roles(Role.Admin)
  // @UseGuards(RolesGuard)
  // @Delete()
  // deleteMembresia(@Param('id', ParseUUIDPipe) id: UUID) {
  //   this.membresiaService.deleteMembresia(id);
  // }
}
