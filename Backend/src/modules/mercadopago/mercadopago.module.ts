import { Module } from "@nestjs/common";
import { MercadoPagoController } from "./mercadopago.controller";
import { MercadoPagoService } from "./mercadopago.service";
import { MercadoPagoRepository } from "./mercadopago.repository";

@Module({
    imports: [],
    controllers: [MercadoPagoController],
    providers: [MercadoPagoService, MercadoPagoRepository],
})
export class MercadoPagoModule{

}