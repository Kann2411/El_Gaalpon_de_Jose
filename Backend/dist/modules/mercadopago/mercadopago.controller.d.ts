import { MercadoPagoService } from './mercadopago.service';
export declare class MercadoPagoController {
    private readonly mercadoPagoService;
    constructor(mercadoPagoService: MercadoPagoService);
    getPaymentStatus(id: any): Promise<any>;
    createPreference(bodySuscription: any): Promise<any>;
}
