import { Body, Controller, Get, Post } from '@nestjs/common';
import { MercadoPagoService } from './mercadopago.service';

@Controller('mercadopago')
export class MercadoPagoController {
  constructor(private readonly mercadoPagoService: MercadoPagoService)
  {}

  @Post('create_preference')
  async createPreference(@Body() bodySuscription) {
    return this.mercadoPagoService.createPreference(bodySuscription)
  }
}
