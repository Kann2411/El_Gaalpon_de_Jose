import {
  Body,
  Controller,
  Get,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { MercadoPagoService } from './mercadopago.service';

@Controller('mercadopago')
export class MercadoPagoController {
  constructor(private readonly mercadoPagoService: MercadoPagoService) {}

  @Post('success')
  async successPayment(@Query('id') id) {
    // return this.mercadoPagoService.getPaymentStatus(id);
    console.log('Pago exitoso');
    return { message: 'Pago exitoso' };
  }

  @Get('failure')
  async failurePayment(@Query('id') id) {
    // return this.mercadoPagoService.getPaymentStatus(id);
    console.log('Pago fallido');
    return { message: 'Pago fallido' };
  }

  @Post('pending')
  async pendingPayment(@Query('id') id) {
    // return this.mercadoPagoService.getPaymentStatus(id);
    console.log('Pago pendiente');
    return { message: 'Pago pendiente' };
  }

  @Post('payment')
  async getPaymentStatus(@Query('id') id, @Query('userId') userId, @Query('pagoId') pagoId) {
    return this.mercadoPagoService.getPaymentStatus(id, userId, pagoId);
  }

  @Post('create_preference')
  async createPreference(@Body() bodySuscription) {
    return this.mercadoPagoService.createPreference(bodySuscription);
  }
}
