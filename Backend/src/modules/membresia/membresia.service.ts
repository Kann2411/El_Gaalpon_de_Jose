import { UUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { MembresiaRepository } from './membresia.repository';
import { Membresia } from './membresia.entity';

@Injectable()
export class membresiaService {
  constructor(private readonly membresiaRepository: MembresiaRepository) {}

  getMembresias() {
    return this.membresiaRepository.getMembresias();
  }

  seederData() {
    return this.membresiaRepository.seederData();
  }

  getMembresiaById(id: UUID) {
    return this.membresiaRepository.getMembresiaById(id);
  }

  createMembresia(membresia: Membresia) {
    return this.membresiaRepository.createMembresia(membresia);
  }

  updateMembresia(id: UUID, membresia: Membresia) {
    this.membresiaRepository.updateMembresia(id, membresia);
  }

  deleteMembresia(id: UUID) {
    this.membresiaRepository.deleteMembresia(id);
  }
}
