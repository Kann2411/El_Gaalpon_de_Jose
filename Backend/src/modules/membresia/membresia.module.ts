import { Module } from '@nestjs/common';
import { MembresiaController } from './membresia.controller';
import { membresiaService } from './membresia.service';
import { MembresiaRepository } from './membresia.repository';

@Module({
  imports: [],
  controllers: [MembresiaController],
  providers: [membresiaService, MembresiaRepository],
})
export class MembresiaModule {
  constructor() {}
}
