import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Membresia } from './membresia.entity';
import { DataSource, Repository } from 'typeorm';
import * as memberships from '../../utils/membresias.json';
import { config as dotenvConfig } from 'dotenv';
import { UUID } from 'crypto';
// import MercadoPagoConfig, { Preference } from 'mercadopago';

dotenvConfig({ path: '.env' });

// const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN });

@Injectable()
export class MembresiaRepository {
  constructor(
    @InjectRepository(Membresia)
    private readonly membresiaRepository: Repository<Membresia>,
    private readonly dataSouce: DataSource,
  ) {}

  async getMembresias() {
    const membresias = await this.membresiaRepository.find();
    return membresias;
  }
  async seederData() {
    const queryRunner = this.dataSouce.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      for (const membershipData of memberships.memberships) {
        const existingMembership = await queryRunner.manager.findOne(
          Membresia,
          {
            where: {
              plan: membershipData.plan,
              price: membershipData.price,
            },
          },
        );

        if (existingMembership) {
          console.log(
            `Membresía con plan ${membershipData.plan} ya existe, omitiendo...`,
          );
          continue;
        }

        const membresia = queryRunner.manager.create(Membresia, {
          ...membershipData,
          features: [],
          plan: membershipData.plan,
          price: membershipData.price,
          currency: membershipData.currency,
          description: membershipData.description,
          benefits: membershipData.benefits,
          idealFor: membershipData.idealFor,
        });

        await queryRunner.manager.save(Membresia, membresia);
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Error during seeding:', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getMembresiaById(id: UUID) {
    return await this.membresiaRepository.findOne({ where: { id } });
  }

  async createMembresia(membresiaDto) {
    const { plan, price, currency, description, benefits, idealFor } =
      membresiaDto;
    const membresia = this.membresiaRepository.create({
      plan,
      price,
      currency,
      description,
      benefits,
      idealFor,
    });
    await this.membresiaRepository.save(membresia);
    return await this.membresiaRepository.findOne({
      where: { id: membresia.id },
    });
  }

  async updateMembresiaPrice(id: string, price: number) {
    await this.membresiaRepository.update({ id }, { price });
    return await this.membresiaRepository.findOne({ where: { id } });
  }

  // async updateMembresia(id: UUID, membresia: Membresia) {
  //   await this.membresiaRepository.update({ id }, membresia);
  //   return await this.membresiaRepository.findOne({ where: { id } });
  // }

  // async deleteMembresia(id: UUID) {
  //   await this.membresiaRepository.delete({ id });
  // }
}
