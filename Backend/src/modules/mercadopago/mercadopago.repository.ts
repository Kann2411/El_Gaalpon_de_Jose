import { Injectable, Redirect } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import MercadoPagoConfig, { Payment, Preference } from 'mercadopago';
import { MercadoPagoService } from './mercadopago.service';
import { config as dotenvConfig } from 'dotenv';
import { Pago } from './pago.entity';
import { DataSource, Repository } from 'typeorm';
import { UUID } from 'crypto';
import { EstadoPago } from 'src/enums/estadoPago.enum';
import { MetodoPago } from 'src/enums/metodoPago.enum';

dotenvConfig({ path: '.env' });

const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN });

@Injectable()
export class MercadoPagoRepository {
  constructor(
    @InjectRepository(Pago)
    private readonly mercadoPagoRepository: Repository<Pago>,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async getPaymentStatus(id, userId) {
    try {
      const response = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        }
      })

      if(response.ok){
        const data = await response.json();

        const pago = await this.mercadoPagoRepository.findOne({
          where: { preferenceId: data.id },
        });

        const newPago = {
          estado: EstadoPago.COMPLETADO,
          fecha: data.date_approved,
          metodoPago: MetodoPago.MERCADOPAGO,
          preferenceId: data.id,
          userId: userId,
          moneda: data.currency_id,
          monto: data.transaction_details.total_paid_amount,
        }
        return this.dataSource.manager.transaction(async (manager) => {
            const pagoData = manager.create(Pago, newPago)
            const result = await manager.save(Pago, pago);
            return "Pago successfully"+result
        });
      }
    } catch (error) {
      console.log('errorssdsds: ', error);
      return error;
    }
  }

  async createPreference(bodySuscription) {
    bodySuscription.userId = "userId";
    console.log(bodySuscription);
    const body = {
      items: [
        {
          id: bodySuscription.id,
          title: bodySuscription.title,
          quantity: Number(bodySuscription.quantity),
          // unit_price: Number(bodySuscription.unit_price),
          unit_price: 1,
          currency_id: 'USD',
        },
      ],
      notification_url: `https://el-gaalpon-de-jose.onrender.com/mercadopago/payment?userId=${bodySuscription.userId}`
    };
    try {
      const preference = await new Preference(client).create({ body });
      
      const pago = this.mercadoPagoRepository.create({
        preferenceId: preference.id,
        userId: bodySuscription.userId,
        estado: EstadoPago.PENDIENTE,
        monto: body.items[0].quantity,
        moneda: 'USD',
        fecha: new Date(),
        metodoPago: MetodoPago.MERCADOPAGO,
      });
      await this.mercadoPagoRepository.save(pago);

      return { redirectUrl: preference.init_point };
    } catch (error) {
      console.log('error: ', error);
      return error;
    }
  }
}
