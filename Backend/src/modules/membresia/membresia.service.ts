import { Injectable } from '@nestjs/common';
import { MembresiaRepository } from './membresia.repository';
import { MembresiaDto } from 'src/dtos/createMembresia.dto';

@Injectable()
export class membresiaService {
  constructor(private readonly membresiaRepository: MembresiaRepository) {}

  getMembresias() {
    return this.membresiaRepository.getMembresias();
  }

  seederData() {
    return this.membresiaRepository.seederData();
  }

  // getMembresiaById(id: UUID) {
  //   return this.membresiaRepository.getMembresiaById(id);
  // }

  createMembresia(membresiaDto: MembresiaDto) {
    return this.membresiaRepository.createMembresia(membresiaDto);
  }

  // updateMembresia(id: UUID, membresia: Membresia) {
  //   this.membresiaRepository.updateMembresia(id, membresia);
  // }

  // deleteMembresia(id: UUID) {
  //   this.membresiaRepository.deleteMembresia(id);
  // }
}
