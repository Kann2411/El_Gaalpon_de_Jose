import { Module } from "@nestjs/common";
import { MercadoPagoController } from "./mercadopago.controller";
import { MercadoPagoService } from "./mercadopago.service";
import { MercadoPagoRepository } from "./mercadopago.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Pago } from "./pago.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Pago])],
    controllers: [MercadoPagoController],
    providers: [MercadoPagoService, MercadoPagoRepository],
})
export class MercadoPagoModule{

}