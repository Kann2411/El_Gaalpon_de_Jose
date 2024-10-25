import { Body, Controller, Get, Post } from '@nestjs/common';
import { config as dotenvConfig } from 'dotenv';
import MercadoPagoConfig, { Preference } from 'mercadopago';

dotenvConfig({ path: '.env' });

const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN });

@Controller('payment')
export class MercadoPagoController {
  @Post('create_preference')
  async createPreference(@Body() bodySuscription) {
    console.log(bodySuscription);
    const body = {
      items: [
        {
          id: bodySuscription.id,
          title: bodySuscription.title,
          quantity: bodySuscription.quantity,
          unit_price: bodySuscription.price,
          currency_id: 'COL',
        },
      ],
    };
    try {
      const preference = await new Preference(client).create({ body });
      console.log('preference: ', preference);
      return { redirectUrl: preference.init_point };
    } catch (error) {
      console.log('error: ', error);
      return error;
    }
  }
}
