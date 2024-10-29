import { Injectable } from '@nestjs/common';
import { MercadoPagoRepository } from './mercadopago.repository';

@Injectable()
export class MercadoPagoService {
  constructor(private readonly mercadoPagoRepository: MercadoPagoRepository) {}

  async getPaymentStatus(id, userId) {
    return this.mercadoPagoRepository.getPaymentStatus(id, userId);
  }

  async createPreference(bodySuscription) {
    return this.mercadoPagoRepository.createPreference(bodySuscription);
  }
}
