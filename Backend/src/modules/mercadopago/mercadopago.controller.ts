import {
  Body,
  Controller,
  Get,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { MercadoPagoService } from './mercadopago.service';
import { UUID } from 'crypto';

@Controller('mercadopago')
export class MercadoPagoController {
  constructor(private readonly mercadoPagoService: MercadoPagoService) {}

  @Get('status')
  async getPaymentStatus(@Query('id') id) {
    return this.mercadoPagoService.getPaymentStatus(id);
  }

  @Post('create_preference')
  async createPreference(@Body() bodySuscription) {
    return this.mercadoPagoService.createPreference(bodySuscription);
  }
}
