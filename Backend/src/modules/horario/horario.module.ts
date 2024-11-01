import { Module } from '@nestjs/common';
import { HorarioController } from './horario.controller';
import { HorarioService } from './horario.service';
import { HorarioRepository } from './horario.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Horario } from './horario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Horario])],
  controllers: [HorarioController],
  providers: [HorarioService, HorarioRepository],
})
export class HorarioModule {}
