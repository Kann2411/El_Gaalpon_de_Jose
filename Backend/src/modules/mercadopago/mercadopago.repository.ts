import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import MercadoPagoConfig, { Preference } from 'mercadopago';
import { MercadoPagoService } from './mercadopago.service';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN });

@Injectable()
export class MercadoPagoRepository{
    constructor(
        // @InjectRepository('mercado_pago') private readonly mercadoPagoRepository: Repository<any>,
    ){}

    async createPreference(bodySuscription){
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