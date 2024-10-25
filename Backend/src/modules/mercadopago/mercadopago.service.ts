import { Injectable } from "@nestjs/common";
import { MercadoPagoRepository } from "./mercadopago.repository";

@Injectable()
export class MercadoPagoService{
    constructor(private readonly mercadoPagoRepository: MercadoPagoRepository)
    {}

    async createPreference(bodySuscription){
        return this.mercadoPagoRepository.createPreference(bodySuscription)
    }
}