import { Module } from '@nestjs/common';
import { MembresiaController } from './membresia.controller';
import { membresiaService } from './membresia.service';
import { MembresiaRepository } from './membresia.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Membresia } from './membresia.entity';
import { FeatureEntity } from './features.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Membresia]),
    TypeOrmModule.forFeature([FeatureEntity]),
  ],
  controllers: [MembresiaController],
  providers: [membresiaService, MembresiaRepository],
})
export class MembresiaModule {
  constructor(private readonly membresiaRepository: MembresiaRepository) {}

  async onModuleInit() {
    console.log('preload Membresias');
    await this.membresiaRepository.seederData();
  }
}
