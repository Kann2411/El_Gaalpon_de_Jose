import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Membresia } from './membresia.entity';
import { DataSource, Repository } from 'typeorm';
import { UUID } from 'crypto';
import * as memberships from '../../utils/membresias.json';
import { FeatureEntity } from './features.entity';

import { config as dotenvConfig } from 'dotenv';
import MercadoPagoConfig, { Preference } from "mercadopago";

dotenvConfig({ path: '.env' });

const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN });

@Injectable()
export class MembresiaRepository {
  constructor(
    @InjectRepository(Membresia)
    private readonly membresiaRepository: Repository<Membresia>,
    @InjectRepository(FeatureEntity)
    private readonly featureRepository: Repository<FeatureEntity>,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  // async getMembresias() {
  //   const membresias = await this.membresiaRepository.find({
  //     relations: ['features'],
  //   });
  //   return membresias;
  // }

  // async seederData() {
  //   const queryRunner = this.dataSouce.createQueryRunner();
  //   await queryRunner.startTransaction();

  //   try {
  //     for (const membershipData of memberships) {
  //       const existingMembership = await queryRunner.manager.findOne(
  //         Membresia,
  //         {
  //           where: {
  //             plan: membershipData.plan,
  //             price: membershipData.price,
  //             currency: membershipData.currency,
  //             billing_period: membershipData.billing_period,
  //           },
  //         },
  //       );

  //       if (existingMembership) {
  //         console.log(
  //           `Membresía con plan ${membershipData.plan} ya existe, omitiendo...`,
  //         );
  //         continue;
  //       }

  //       const membresia = queryRunner.manager.create(Membresia, {
  //         ...membershipData,
  //         features: [],
  //       });

  //       await queryRunner.manager.save(Membresia, membresia);

  //       const features = Object.entries(membershipData.features).map(
  //         ([name, value]) => ({
  //           name,
  //           value: Boolean(value),
  //           membresia,
  //         }),
  //       );

  //       membresia.features = await queryRunner.manager.save(
  //         FeatureEntity,
  //         features,
  //       );

  //       await queryRunner.manager.save(Membresia, membresia);
  //     }

  //     await queryRunner.commitTransaction();
  //   } catch (error) {
  //     await queryRunner.rollbackTransaction();
  //     console.error('Error during seeding:', error);
  //     throw error;
  //   } finally {
  //     await queryRunner.release();
  //   }
  // }

  // async getMembresiaById(id: UUID) {
  //   return await this.membresiaRepository.findOne({ where: { id } });
  // }

  async createMembresia(membresia: Membresia) {
    return await this.dataSource.manager.transaction(async (manager) => {
      const body = {
      items: [
          {
          id: membresia.id,
          title: membresia.plan,
          quantity: 1,
          unit_price: membresia.price,
          currency_id: membresia.currency, // COL, ARG
          }
      ]
      }
      try {
      const preference = await new Preference(client).create({body});
      await manager.save(membresia)
      return {redirectUrl: preference.init_point};
      } catch (error) {
          return error
      }
    });
  }

  // async updateMembresia(id: UUID, membresia: Membresia) {
  //   await this.membresiaRepository.update({ id }, membresia);
  //   return await this.membresiaRepository.findOne({ where: { id } });
  // }

  // async deleteMembresia(id: UUID) {
  //   await this.membresiaRepository.delete({ id });
  // }
}
