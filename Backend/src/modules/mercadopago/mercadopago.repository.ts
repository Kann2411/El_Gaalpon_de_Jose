import { BadRequestException, Injectable, Redirect } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import MercadoPagoConfig, { Payment, Preference } from 'mercadopago';
import { config as dotenvConfig } from 'dotenv';
import { Pago } from './pago.entity';
import { DataSource, Repository } from 'typeorm';
import { EstadoPago } from 'src/enums/estadoPago.enum';
import { MetodoPago } from 'src/enums/metodoPago.enum';
import { User } from '../users/users.entity';
import { UsersRepository } from '../users/users.repository';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { v4 as uuidv4 } from 'uuid';

dotenvConfig({ path: '.env' });

const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN });

@Injectable()
export class MercadoPagoRepository {
  constructor(
    @InjectRepository(Pago)
    private readonly mercadoPagoRepository: Repository<Pago>,
    @InjectRepository(User) private readonly usersRepository: UsersRepository,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async getPaymentStatus(id, userId, pagoId) {
    try {
      const response = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        }
      })

      if(response.ok){
        const data = await response.json();
        console.log("data: ",data, "fin data")

        let pago = await this.mercadoPagoRepository.findOne({
          where: { id: pagoId },
        });

        if(!pago){
          throw new BadRequestException("El pago no ha sido encontrado")
        }

        pago = {
          ...pago,
          estado: EstadoPago.COMPLETADO,
          fecha: data.date_approved,
          metodoPago: MetodoPago.MERCADOPAGO,
          preferenceId: data.id,
          user: userId,
          moneda: data.currency_id,
          monto: data.transaction_details.total_paid_amount,
        }
        return this.dataSource.manager.transaction(async (manager) => {
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
    const uuid = uuidv4();
    let pagoB = this.mercadoPagoRepository.create({
      id: String(uuid),
      preferenceId: "null",
      user: bodySuscription.userId,
      estado: EstadoPago.PENDIENTE,
      monto: 0,
      moneda: 'USD',
      fecha: new Date(),
      metodoPago: MetodoPago.MERCADOPAGO,
    });
    await this.mercadoPagoRepository.save(pagoB);
    let pago = await this.mercadoPagoRepository.findOne({where: {id: pagoB.id}})

    const body = {
      items: [
        {
          id: bodySuscription.id,
          title: bodySuscription.title,
          quantity: Number(bodySuscription.quantity),
          unit_price: Number(bodySuscription.unit_price),
          currency_id: 'USD',
        },
      ],
      payer: {
        email: 'test_user_1072648989@testuser.com',
      },
      // Url de la aplicación deployada o un url de un tunnel
      notification_url: `https://principles-conviction-sparc-refused.trycloudflare.com/mercadopago/payment?userId=${bodySuscription.userId}&pagoId=${pago.id}`,
    };
    try {
      const preference = await new Preference(client).create({ body });

      pago ={
        ...pago,
        preferenceId: preference.id,
        user: bodySuscription.userId,
        estado: EstadoPago.PENDIENTE,
        monto: body.items[0].quantity,
        moneda: 'USD',
        fecha: new Date(),
        metodoPago: MetodoPago.MERCADOPAGO,
      };
      
      await this.mercadoPagoRepository.save(pago);
      
      return { redirectUrl: preference.init_point };
    } catch (error) {
      console.log('error: ', error);
      return error;
    }
  }
}
