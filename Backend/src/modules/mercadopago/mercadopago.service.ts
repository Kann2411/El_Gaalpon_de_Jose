import { Injectable } from '@nestjs/common';
import { MercadoPagoRepository } from './mercadopago.repository';
import { UUID } from 'crypto';

@Injectable()
export class MercadoPagoService {
  constructor(private readonly mercadoPagoRepository: MercadoPagoRepository) {}

  async getPaymentStatus(id) {
    return this.mercadoPagoRepository.getPaymentStatus(id);
  }

  async createPreference(bodySuscription) {
    return this.mercadoPagoRepository.createPreference(bodySuscription);
  }
  
}
