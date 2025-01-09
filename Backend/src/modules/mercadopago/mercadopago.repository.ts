import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import MercadoPagoConfig, { Preference } from 'mercadopago';
import { config as dotenvConfig } from 'dotenv';
import { Pago } from './pago.entity';
import { DataSource, Repository } from 'typeorm';
import { EstadoPago } from 'src/enums/estadoPago.enum';
import { MetodoPago } from 'src/enums/metodoPago.enum';
import { User } from '../users/users.entity';
import { UsersRepository } from '../users/users.repository';
import { v4 as uuidv4 } from 'uuid';
import { MailerService } from '@nestjs-modules/mailer';

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
  async createPreference(bodySuscription) {
    return await this.dataSource.manager.transaction(async (manager) => {
      const uuid = uuidv4();
      const pagoB = this.mercadoPagoRepository.create({
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
