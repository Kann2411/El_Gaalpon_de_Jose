import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Options,
  Redirect,
} from '@nestjs/common';
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
import { MailerService } from '@nestjs-modules/mailer';
import { EstadoMembresia } from 'src/enums/estadoMembresia.enum';

dotenvConfig({ path: '.env' });

const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN });

@Injectable()
export class MercadoPagoRepository {
  constructor(
    @InjectRepository(Pago)
    private readonly mercadoPagoRepository: Repository<Pago>,
    private readonly usersRepository: UsersRepository,
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly mailerService: MailerService,
  ) {}

  async getTotalPayments() {
    const { sum } = await this.mercadoPagoRepository
      .createQueryBuilder('pago')
      .select('SUM(pago.monto)', 'sum')
      .where('pago.estado = :estado', { estado: EstadoPago.COMPLETADO })
      .getRawOne();

    return { totalPayments: sum || 0 };
  }

  async getLastPaymentByUser(userId: string) {
    const lastPayment = await this.mercadoPagoRepository.findOne({
      where: { user: { id: userId } },
      order: { fecha: 'DESC' },
    });

    if (!lastPayment) {
      throw new HttpException(
        'No payment found for this user',
        HttpStatus.NOT_FOUND,
      );
    }
    return lastPayment;
  }

  async getPaymentsByUser(userId: string) {
    const payments = await this.mercadoPagoRepository.find({
      where: { user: { id: userId } },
      order: { fecha: 'DESC' },
    });

    return payments;
  }

  async getPaymentStatus(id, userId, pagoId) {
    return await this.dataSource.manager.transaction(async (manager) => {
      try {
        const user = await this.usersRepository.getUserById(userId);
        if (!user) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        const response = await fetch(
          `https://api.mercadopago.com/v1/payments/${id}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
            },
          },
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);

          let pago = await this.mercadoPagoRepository.findOne({
            where: { id: pagoId },
          });

          if (!pago) {
            throw new HttpException(
              'The payment has not been found',
              HttpStatus.NOT_FOUND,
            );
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
          };
          return this.dataSource.manager.transaction(async (manager) => {
            const result = await manager.save(Pago, pago);
            user.estadoMembresia = EstadoMembresia.ACTIVA;
            await manager.save(User, user);

            this.mailerService.sendMail({
              to: user.email,
              from: process.env.EMAIL_USER,
              subject: 'Pago Confirmado',
              template: 'payment-confirmation',
              text: 'Confirmado',
              html: `
              <!DOCTYPE html>
              <html lang="es">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Confirmación de Pago</title>
                <style>
                  body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f7f7f7;
                    color: #333;
                  }
                  .container {
                    max-width: 600px;
                    margin: 20px auto;
                    padding: 20px;
                    background-color: #ffffff;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    border-radius: 8px;
                  }
                  .header {
                    text-align: center;
                    padding: 10px 0;
                    color: #4CAF50;
                  }
                  .header h1 {
                    margin: 0;
                    font-size: 24px;
                  }
                  .content {
                    margin-top: 20px;
                    line-height: 1.6;
                  }
                  .payment-details {
                    background-color: #f1f1f1;
                    padding: 15px;
                    border-radius: 6px;
                    margin-top: 20px;
                  }
                  .footer {
                    text-align: center;
                    margin-top: 30px;
                    color: #999;
                    font-size: 14px;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1>¡Pago Confirmado!</h1>
                    <p>Gracias por su compra</p>
                  </div>
                  <div class="content">
                    <p>Estimado/a <strong>${user.name}</strong>,</p>
                    <p>Nos complace informarle que hemos recibido su pago de manera exitosa. A continuación, encontrará los detalles de su transacción:</p>
                    
                    <div class="payment-details">
                      <p><strong>ID de Transacción:</strong> ${data.id}</p>
                      <p><strong>Monto:</strong> ${data.transaction_details.total_paid_amount} ${data.currency_id}</p>
                      <p><strong>Fecha:</strong> ${data.date_approved}</p>
                    </div>

                    <p>Si tiene alguna pregunta o necesita asistencia adicional, no dude en ponerse en contacto con nuestro equipo de soporte.</p>
                    <p>Gracias por confiar en nosotros.</p>
                  </div>
                  <div class="footer">
                    <p>Atentamente,<br>Equipo de Desarrolladores del Gimnasio</p>
                  </div>
                </div>
              </body>
              </html>
            `,
            });
            return 'Pago successfully' + result;
          });
        }
      } catch (error) {
        console.log('errorssdsds: ', error);
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    });
  }

  async createPreference(bodySuscription) {
    return await this.dataSource.manager.transaction(async (manager) => {
      const uuid = uuidv4();
      let pagoB = this.mercadoPagoRepository.create({
        id: String(uuid),
        preferenceId: 'null',
        user: bodySuscription.userId,
        estado: EstadoPago.PENDIENTE,
        monto: 0,
        moneda: 'ARS',
        fecha: new Date(),
        metodoPago: MetodoPago.MERCADOPAGO,
      });
      await this.mercadoPagoRepository.save(pagoB);
      let pago = await this.mercadoPagoRepository.findOne({
        where: { id: pagoB.id },
      });

      const body = {
        items: [
          {
            id: bodySuscription.id,
            title: bodySuscription.title,
            quantity: Number(bodySuscription.quantity),
            unit_price: Number(bodySuscription.unit_price),
            currency_id: 'ARS',
          },
        ],
        back_urls: {
          success: `https://el-gaalpon-de-jose.onrender.com/mercadopago/success?id=${pagoB.id}&userId=${bodySuscription.userId}`, // URL de éxito
          failure: `https://el-gaalpon-de-jose.onrender.com/mercadopago/failure?id=${pagoB.id}&userId=${bodySuscription.userId}`, // URL de fallo
          pending: `https://el-gaalpon-de-jose.onrender.com/mercadopago/pending?id=${pagoB.id}&userId=${bodySuscription.userId}`, // URL de pendiente
        },
        auto_return: 'approved',

        notification_url: `https://el-gaalpon-de-jose.onrender.com/mercadopago/payment?userId=${bodySuscription.userId}&pagoId=${pago.id}`,
      };
      try {
        const preference = await new Preference(client).create({ body });
        const user = await this.usersRepository.getUserById(
          bodySuscription.userId,
        );

        if (!user)
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);

        pago = {
          ...pago,
          preferenceId: preference.id,
          user: bodySuscription.userId,
          estado: EstadoPago.PENDIENTE,
          monto: body.items[0].quantity,
          moneda: 'ARS',
          fecha: new Date(),
          metodoPago: MetodoPago.MERCADOPAGO,
        };
        user.membership = bodySuscription.title;

        await this.mercadoPagoRepository.save(pago);
        await manager.save(User, user);

        return { redirectUrl: preference.init_point };
      } catch (error) {
        if (error instanceof HttpException) {
          throw error;
        }

        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    });
  }
}
/*
back_urls: {
          success: `http://localhost:3000/mercadopago/success?id=${pagoB.id}&userId=${bodySuscription.userId}&token=${bodySuscription.token}`,
          failure: `http://localhost:3000/mercadopago/failure?id=${pagoB.id}&userId=${bodySuscription.userId}&token=${bodySuscription.token}`,
          pending: `http://localhost:3000/mercadopago/pending?id=${pagoB.id}&userId=${bodySuscription.userId}&token=${bodySuscription.token}`,
      },
        auto_return: 'approved',
*/
