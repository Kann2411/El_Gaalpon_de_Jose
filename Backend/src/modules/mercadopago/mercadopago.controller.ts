import {
  Body,
  Controller,
  Get,
  ParseUUIDPipe,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { MercadoPagoService } from './mercadopago.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Role } from '../../enums/role.enum';
import { Roles } from '../../decorators/role.decorator';

@Controller('mercadopago')
export class MercadoPagoController {
  constructor(private readonly mercadoPagoService: MercadoPagoService) {}

  @Get('total-payments')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard)
  async getTotalPayments() {
    return this.mercadoPagoService.getTotalPayments();
  }

  @Get('last-payment')
  @UseGuards(AuthGuard)
  async getLastPaymentByUser(@Query('userId') userId: string) {
    return this.mercadoPagoService.getLastPaymentByUser(userId);
  }

  @Get('payments-by-user')
  @UseGuards(AuthGuard)
  async getPaymentsByUser(@Query('userId') userId: string) {
    return this.mercadoPagoService.getPaymentsByUser(userId);
  }

  @Get('success')
  async successPayment(
    @Query('id') paymentId,
    @Query('userId') userId,
    @Res() res,
  ) {
    console.log('Pago exitosoID de pago:', paymentId, 'ID de usuario:', userId);
    return res.redirect(
      `http://localhost:3001/plans?paymentSuccess=true&id=${paymentId}&userId=${userId}`,
    );
  }

  @Get('failure')
  async failurePayment(
    @Query('id') paymentId,
    @Query('userId') userId,
    @Res() res,
  ) {
    console.log(
      'Pago fallido ID de pago:',
      paymentId,
      'ID de usuario:',
      userId,
    );
    return res.redirect(
      `http://localhost:3001/plans?paymentSuccess=false&&id=${paymentId}&userId=${userId}`,
    );
  }

  @Get('pending')
  async pendingPayment(
    @Query('id') paymentId,
    @Query('userId') userId,
    @Res() res,
  ) {
    console.log(
      'Pago pendiente ID de pago:',
      paymentId,
      'ID de usuario:',
      userId,
    );
    return res.redirect(
      `http://localhost:3001/plans?paymentSuccess=pending&&id=${paymentId}&userId=${userId}`,
    );
  }
  @Post('payment')
  async getPaymentStatus(
    @Query('id') id,
    @Query('userId') userId,
    @Query('pagoId') pagoId,
  ) {
    return this.mercadoPagoService.getPaymentStatus(id, userId, pagoId);
  }

  @Post('create_preference')
  @UseGuards(AuthGuard)
  async createPreference(@Body() bodySuscription) {
    return this.mercadoPagoService.createPreference(bodySuscription);
  }
}
