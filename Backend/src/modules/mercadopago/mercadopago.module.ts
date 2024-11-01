import { Module } from '@nestjs/common';
import { MercadoPagoController } from './mercadopago.controller';
import { MercadoPagoService } from './mercadopago.service';
import { MercadoPagoRepository } from './mercadopago.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pago } from './pago.entity';
import { User } from '../users/users.entity';
import { UsersRepository } from '../users/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Pago, User])],
  controllers: [MercadoPagoController],
  providers: [MercadoPagoService, MercadoPagoRepository, UsersRepository],
})
export class MercadoPagoModule {}
