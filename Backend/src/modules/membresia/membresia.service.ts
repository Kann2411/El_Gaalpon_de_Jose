import { UUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { MembresiaRepository } from './membresia.repository';
import { Membresia } from './membresia.entity';

@Injectable()
export class membresiaService {
  constructor(private readonly membresiaRepository: MembresiaRepository) {}

  async getMembresias() {
    return this.membresiaRepository.getMembresias();
  }

  async getMembresiaById(id: UUID) {
    return await this.membresiaRepository.getMembresiaById(id);
  }

  async createMembresia(membresia: Membresia) {
    return await this.membresiaRepository.createMembresia(membresia);
  }

  async updateMembresia(id: UUID, membresia: Membresia) {
    await this.membresiaRepository.updateMembresia(id, membresia);
  }

  async deleteMembresia(id: UUID) {
    await this.membresiaRepository.deleteMembresia(id);
  }
}
