import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import MercadoPagoConfig, { Payment, Preference } from 'mercadopago';
import { MercadoPagoService } from './mercadopago.service';
import { config as dotenvConfig } from 'dotenv';
import { Pago } from './pago.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';

dotenvConfig({ path: '.env' });

const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN });

@Injectable()
export class MercadoPagoRepository {
  constructor(
    @InjectRepository(Pago)
    private readonly mercadoPagoRepository: Repository<Pago>,
  ) {}

  async getPaymentStatus(preferenceId: UUID) {
    try {
      console.log(typeof preferenceId);
      const response = await new Payment(client).get({ id: '123' });
      const status = response.status;
      console.log('Payment status: ', status);
      return { status };
    } catch (error) {
      console.log('errorssdsds: ', error);
      return error;
    }
  }

  async createPreference(bodySuscription) {
    console.log(bodySuscription);
    const body = {
      items: [
        {
          id: '123',
          title: bodySuscription.title,
          quantity: Number(bodySuscription.quantity),
          // unit_price: Number(bodySuscription.unit_price),
          unit_price: 1000,
          currency_id: 'COL',
        },
      ],
    };
    try {
      const preference = await new Preference(client).create({ body });
      console.log('preference: ', preference);
      console.log(preference.id);
      return { redirectUrl: preference.init_point };
    } catch (error) {
      console.log('error: ', error);
      return error;
    }
  }
}
