import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { Horario } from './horario.entity';
import { HorarioRepository } from './horario.repository';

@Injectable()
export class HorarioService {
  constructor(private readonly horarioesRepository: HorarioRepository) {}

  getHorarios() {
    return this.horarioesRepository.getHorarios();
  }

  getHorarioById(id: UUID) {
    return this.horarioesRepository.getHorarioById(id);
  }

  createHorario(horarioData: Horario) {
    return this.horarioesRepository.createHorario(horarioData);
  }

  updateHorario(id: UUID, horarioData: Horario) {
    return this.horarioesRepository.updateHorario(id, horarioData);
  }

  deleteHorario(id: UUID) {
    return this.horarioesRepository.deleteHorario(id);
  }
}
