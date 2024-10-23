import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Membresia } from './membresia.entity';
import { DataSource, Repository } from 'typeorm';
import { UUID } from 'crypto';
import * as memberships from '../../utils/membresias.json';
import { FeatureEntity } from './features.entity';

@Injectable()
export class MembresiaRepository {
  constructor(
    @InjectRepository(Membresia)
    private readonly membresiaRepository: Repository<Membresia>,
    @InjectRepository(FeatureEntity)
    private readonly featureRepository: Repository<FeatureEntity>,
    private readonly dataSouce: DataSource,
  ) {}

  async getMembresias() {
    const membresias = await this.membresiaRepository.find({
      relations: ['features'],
    });
    return membresias;
  }

  async seederData() {
    const queryRunner = this.dataSouce.createQueryRunner();

    await queryRunner.startTransaction();

    try {
      for (const membershipData of memberships) {
        // Verificar si existe una membresía con los mismos datos exactos
        const existingMembership = await queryRunner.manager.findOne(
          Membresia,
          {
            where: {
              plan: membershipData.plan,
              price: membershipData.price,
              currency: membershipData.currency,
              billing_period: membershipData.billing_period,
            },
          },
        );

        if (existingMembership) {
          console.log(
            `Membresía con plan ${membershipData.plan} ya existe con los mismos valores, no se volverá a guardar.`,
          );
          continue;
        }

        const membresia = new Membresia();
        membresia.plan = membershipData.plan;
        membresia.price = membershipData.price;
        membresia.currency = membershipData.currency;
        membresia.billing_period = membershipData.billing_period;

        await queryRunner.manager.save(Membresia, membresia);

        const features = Object.entries(membershipData.features).map(
          ([name, value]) => {
            const feature = new FeatureEntity();
            feature.name = name;
            feature.value = typeof value === 'boolean' ? value : null; // Manejar el caso de strings si es necesario
            feature.membresia = membresia; // Asocia la membresía ya guardada
            return feature;
          },
        );
        const savedFeatures = await queryRunner.manager.save(
          FeatureEntity,
          features,
        );
        membresia.features = savedFeatures;
        await queryRunner.manager.save(Membresia, membresia);
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      // Retrocede si hay algún error
      await queryRunner.rollbackTransaction();
      console.error('Error during seeding:', error);
      throw error;
    } finally {
      // Libera el query runner
      await queryRunner.release();
    }
  }

  async getMembresiaById(id: UUID) {
    return await this.membresiaRepository.findOne({ where: { id } });
  }

  async createMembresia(membresia: Membresia) {
    return await this.membresiaRepository.save(membresia);
  }

  async updateMembresia(id: UUID, membresia: Membresia) {
    await this.membresiaRepository.update({ id }, membresia);
    return await this.membresiaRepository.findOne({ where: { id } });
  }

  async deleteMembresia(id: UUID) {
    await this.membresiaRepository.delete({ id });
  }
}
